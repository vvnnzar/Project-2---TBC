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
const auth = require("./auth");

router.get("/", async (req, res) => {
    const payload = auth.extractPayload(req, res);
    let {
        logged_in: logged_in,
        userid: user_id,
        name: username,
    } = payload || { logged_in: false };
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
            questions,
            logged_in,
        });
    } catch (err) {
        res.status(500).json("hello err" + err);
    }
});

router.get("/question/:id", async (req, res) => {
    const payload = auth.extractPayload(req, res);
    let {
        logged_in: logged_in,
        userid: user_id,
        name: username,
    } = payload || { logged_in: false };
    const { id } = req.params;
    try {
        const questionData = await Question.findByPk(id, {
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
        if (!questionData) {
            res.sendStatus(404);
            return;
        }

        const question = questionData.get({ plain: true });

        question.comments.forEach((comment) => {
            comment.is_owner = user_id === comment.user_id;
        });

        const isOwner = question.user_id === user_id;
        res.render("question", {
            ...question,
            is_owner: isOwner,
            logged_in: logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/login", (req, res) => {
    const payload = auth.extractPayload(req, res);
    let {
        logged_in: logged_in,
        userid: user_id,
        name: username,
    } = payload || { logged_in: false };
    if (logged_in) {
        res.redirect("/");
        return;
    }
    res.render("login");
});

router.get("/signup", (req, res) => {
    const payload = auth.extractPayload(req, res);
    let {
        logged_in: logged_in,
        userid: user_id,
        name: username,
    } = payload || { logged_in: false };
    if (logged_in) {
        res.redirect("/");
        return;
    }
    res.render("signup");
});

//profile
router.get("/profile", [auth.isLoginNeeded], async (req, res) => {
    try {
        const payload = auth.extractPayload(req, res);
        console.log(payload);
        const {
            logged_in: logged_in,
            userid: user_id,
            name: username,
        } = payload || { logged_in: false };
        // Find the logged in user based on the session ID
        const currentUser = await User.findByPk(user_id, {
            attributes: { exclude: ["password"] },
            include: [
                { model: Reputation },
                { model: QuizResult },
                //                 { model: IsTutor },
            ],
        });
        console.log(currentUser);
        console.log(user_id);
        const user = currentUser.get({ plain: true });

        res.render("profile", {
            ...user,
            logged_in: logged_in,
        });
    } catch (err) {
        res.status(500).json("err: " + err);
    }
});
router.get("/edit-question/:id", async (req, res) => {
    try {
        const payload = auth.extractPayload(req, res);
        console.log(payload);
        const {
            logged_in: logged_in,
            userid: user_id,
            name: username,
        } = payload || { logged_in: false };

        const questionData = await Question.findByPk(req.params.id);

        const question = questionData.get({ plain: true });
        const isOwner = question.user_id === user_id;

        res.render("edit-question", {
            ...question,
            logged_in: logged_in,
            is_owner: isOwner,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit-question/:id', async (req, res) => {
    try {
        const payload = auth.extractPayload(req, res);
        console.log(payload);
        const {
            logged_in: logged_in,
            userid: user_id,
            name: username,
        } = payload || { logged_in: false };

        const questionData = await Question.findByPk(req.params.id);

        const question = questionData.get({ plain: true });
        const isOwner = question.user_id === user_id;

        res.render('edit-question', {
            ...question,
            logged_in: logged_in,
            is_owner: isOwner
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/quiz', (req, res) => {

    const payload = auth.extractPayload(req, res);
    console.log(payload);
    const {
        logged_in: logged_in,
        userid: user_id,
        name: username,
    } = payload || { logged_in: false };

    res.render('quiz', {
        logged_in: logged_in
    });
});

router.get(
    "/ask-question",
    [auth.isLoginNeeded, auth.loadUserDataFromJwtSession],
    (req, res) => {
        res.render("ask-question", {
            logged_in: true,
        });
    }
);

router.get("/logout", (req, res) => {
    req.session.userToken = "";
    res.redirect("/");
});

module.exports = router;
