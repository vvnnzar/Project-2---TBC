const router = require("express").Router();
// const { User, IsTutor, Comment, Question, Reputation, QuizResult } = require('../models');
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        // const questionData = await Question.findAll({
        //     include: [
        //         {
        //             model: User,
        //             attributes: ["username"],
        //         },
        //     ],
        // });
        // const questions = questionData.map((question) =>
        //     question.get({ plain: true })
        // );
        console.log(req);

        res.render("homepage", {
            questions: questions,
        });
    } catch (err) {
        res.status(500).json(err);
    }
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

module.exports = router;
