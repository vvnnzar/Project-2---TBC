// authentication will go in heres

const bcrypt = require("bcryptjs");
const express = require("express");
const csurf = require("csurf");
const njwt = require("njwt");

let router = express.Router();

let User = require("../models/User");

router.get("/signup", (req, res) => {
    res.render("signup", { csrfToken: req.csrfToken() });
});

// initialise user session

initialiseUserSession = (req, res, user, userScope) => {
    let claims = { scope: userScope };
};
// TODO: make sure the auth doesnt consider unsigned JWTS as valid - prevents signature stripping
