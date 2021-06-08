// authentication will go in heres
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../models");

module.exports.isLoginNeeded = (req, res, next) => {
    // no user id stored in locals, no one is logged in
    if (!req.session) {
        res.redirect("/login");
    }
    next();
};

module.exports.createJwtSession = (req, res, user, next) => {
    // establishing jwt settings

    const accessClaims = {
        expiresIn: "15m",
        notBefore: Math.floor(Date.now() / 1000) - 30,
    };
    const refreshClaims = {
        expiresIn: "2d",
        notBefore: Math.floor(Date.now() / 1000) - 30,
    };
    const tokenPayload = { userid: user.id, name: user.username };

    /**create two tokens:
     *  Access Token - short expiration time
     *  Refresh token - used to regen access tokens -- longer exp time
     */
    const accessToken = jwt.sign(
        tokenPayload,
        process.env.ACCESS_SECRET_KEY,
        accessClaims
    );
    console.log(accessToken);
    const refreshToken = jwt.sign(
        tokenPayload,
        process.env.REFRESH_SECRET_KEY,
        refreshClaims
    );
    console.log(refreshToken);
    // maxAge is 2days in mili seconds
    // res.cookie("token", refreshToken, {
    //     maxAge: 2 * 24 * 60 * 60 * 1000,
    //     httpOnly: true,
    //     sameSite: "strict",
    // });
    // res.csrfToken = req.csrfToken();
    // res.body.accessToken = accessToken;
    req.session.userToken = refreshToken;
    res.status(201);
};

module.exports.loadUserDataFromJwtSession = async (req, res, next) => {
    if (!req.session && req.session.userToken) {
        return next();
    }
    const verifyToken = jwt.verify(
        req.session.userToken,
        process.env.REFRESH_SECRET_KEY
    );

    const user = await User.findByPk(verifyToken.userid);
    user.password = undefined;
    req.session.userid = user.id;
    req.session.logged_in = true;
};
