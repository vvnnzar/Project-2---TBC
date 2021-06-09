<<<<<<< HEAD:controllers/auth.js
// authentication will go in heres
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../models");

module.exports.isLoginNeeded = (req, res, next) => {
    // no user id stored in locals, no one is logged in
    console.log(req.session.userToken);
    if (!req.session.userToken) {
        res.redirect("/login");
    }
    const { userToken: token } = req.session;

    const verfiedToken = jwt.verify(token, process.env.REFRESH_SECRET_KEY);
    const { logged_in: isLoggedIn } = verfiedToken;

    if (!isLoggedIn) {
        res.redirect("/login");
    }
    next();
};

module.exports.createJwtSession = (req, res, user) => {
    const { id: userid, username: name } = user;
    // establishing jwt settings
    const logged_in = true;

    const refreshClaims = {
        expiresIn: "2d",
        notBefore: 0,
    };
    const tokenPayload = { userid, name, logged_in };
    const refreshToken = jwt.sign(
        tokenPayload,
        process.env.REFRESH_SECRET_KEY,
        refreshClaims
    );
    console.log(refreshToken);
    req.session.userToken = refreshToken;
    res.status(201);
};

module.exports.loadUserDataFromJwtSession = async (req, res, next) => {
    if (!req.session.logged_in && req.session.userToken) {
        return next();
    }
    console.log("headers:   ----    " + req.headers["authorization"]);

    const verifyToken = jwt.verify(
        req.session.userToken,
        process.env.REFRESH_SECRET_KEY
    );

    const user = await User.findByPk(verifyToken.userid);
    user.password = undefined;
    const { userId } = user.id;
    req.session.userid = userId;
    req.session.logged_in = true;
};

module.exports.extractPayload = (req, res) => {
    console.log("headers:   ----    " + req.headers["authorization"]);
    if (!req.session.userToken) return;
    const verifyToken = jwt.verify(
        req.session.userToken,
        process.env.REFRESH_SECRET_KEY
    );
    return verifyToken;
};
=======
// authentication will go in heres
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../models");

module.exports.isLoginNeeded = (req, res, next) => {
    // no user id stored in locals, no one is logged in
    if (!req.session.logged_in) {
        res.redirect("/login");
    }
    next();
};

module.exports.createJwtSession = (req, res, user) => {
    const { id: userid, username: name } = user;
    // establishing jwt settings

    // const accessClaims = {
    //     expiresIn: "15m",
    //     notBefore: Math.floor(Date.now() / 1000) - 30,
    // };
    const refreshClaims = {
        expiresIn: "2d",
        notBefore: Math.floor(Date.now() / 1000) - 30,
    };
    const tokenPayload = { userid, name };

    /**create two tokens:
     *  Access Token - short expiration time
     *  Refresh token - used to regen access tokens -- longer exp time
     */
    // const accessToken = jwt.sign(
    //     tokenPayload,
    //     process.env.ACCESS_SECRET_KEY,
    //     accessClaims
    // );
    // console.log(accessToken);
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

>>>>>>> 5ab5bdd9d0cf567b3738a5e7ca03370e05edbddd:routes/auth.js
