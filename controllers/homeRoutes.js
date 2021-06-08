const router = require("express").Router();
const {
    User,
    IsTutor,
    Comment,
    Question,
    Reputation,
    QuizResult,
} = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        const questionData = await Question.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });
        const questions = questionData.map((question) =>
            question.get({ plain: true })
        );

        res.render("homepage", {
            questions: questions,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/question/:id", async (req, res) => {
    try {
        const questionData = await Question.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ["username"],
                        },
                    ],
                },
            ],
        });

        const question = questionData.get({ plain: true });
        const isOwner = question.user_id === req.session.user_id;
        res.render("question", {
            ...question,
            is_owner: isOwner,
            logged_in: req.session.logged_in,
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
    // if (req.session.logged_in) {
    //     res.redirect("/");
    //     return;
    // }
    res.render("signup");
});

//profile
// router.get("/profile", async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const currentUser = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ["password"] },
//       include: [
//         { model: Reputation },
//         { model: QuizResult },
//         { model: IsTutor },
//       ],
//     });

//     const user = currentUser.get({ plain: true });

//     res.render("profile", {
//       ...user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/profile", async (req, res) => {
    console.log(req.headers);
    res.render("profile");
});

router.get("/interview-question", withAuth, async (req, res) => {
    try {
        const questionData = await Question.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });
        const questions = questionData.map((question) =>
            question.get({ plain: true })
        );

        res.render("interview-question", {
            questions: questions,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/ask-question", (req, res) => {
    res.render("ask-question", {
        logged_in: true,
    });
});

module.exports = router;
