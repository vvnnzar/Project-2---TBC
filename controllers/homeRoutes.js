const router = require("express").Router();
// const { User, IsTutor, Comment, Question, Reputation, QuizResult } = require('../models');
const withAuth = require("../utils/auth");
const { User } = require("../models");
require("dotenv").config();

router.get("/", async (req, res) => {
    res.render("homepage");
    return;
});

router.get("/login", (req, res) => {
    // if (req.session.logged_in) {
    //     res.redirect("/");
    //     return;
    // }
    res.render("login");
});

router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("signup");
});

// main pages

router.get("/tutors", async (req, res) => {
    const allTutors = await User.findAll({ where: { isTutor: true } }).catch(
        (err) => {
            res.json(err);
        }
    );
    const tutors = allTutors.map((tutor) => {
        tutor.get({ plain: true });
    });
    res.render("tutors", { tutors });
});

module.exports = router;
