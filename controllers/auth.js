// authentication will go in heres

const bcrypt = require("bcryptjs");
const express = require("express");
const csurf = require("csurf");

let router = express.Router();

let User = require("../models/User");

router.get("/signup", (req, res) => {
    res.render("signup", { csrfToken: req.csrfToken() });
});
