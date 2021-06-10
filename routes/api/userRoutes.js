const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { ValidationError } = require("sequelize");
const { User } = require("../../models");
require("dotenv").config();
const auth = require("../auth");

router.post("/signup", async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    // creating User Model after registration
    const { username, firstName, lastName, email, password, isTutor } =
        req.body;
    const userData = {
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
    };
    try {
        const userRegistration = await User.create(userData);
        console.log("user created");
        auth.createJwtSession(req, res, userRegistration);
        console.log("sessioin created");
        res.status(201).json({
            usernameTaken: false,
            emailTaken: false,
            isTutor,
        });
        res.end();
    } catch (err) {
        console.log(err instanceof ValidationError);
        if (err instanceof ValidationError) {
            const errorValidatonField = err.errors[0].path.split(".")[1];
            if (errorValidatonField === "username") {
                console.log("usernameTaken");
                res.status(200).json({ usernameTaken: true });
            } else if (errorValidatonField === "email") {
                res.status(200).json({ emailTaken: true });
            } else {
                res.status(500);
            }
            console.log(err);
        } else {
            console.log(err);
            res.status(500);
        }
    }
    // TODO: if (isTutor === true) {res.render('quiz')}

    // handle unique username
});

router.post("/login", async (req, res) => {
    let { username: name, password: password } = req.body;
    try {
        const currentUser = await User.findOne({
            where: { username: name },
        });
        const { password: passwordToConfirm } = currentUser || {};
        if (
            currentUser &&
            (await currentUser.comparePassword(password, passwordToConfirm))
        ) {
            password = undefined;
            auth.createJwtSession(req, res, currentUser);
            res.status(302).redirect("/profile");
        } else {
            res.render("login", { logInFailed: true });
        }
    } catch (err) {
        res.status(500).send(`${err}`);
    }
});

//profile page update user data
// update product data
// TODO:
router.put("/user/:id", (req, res) => {
    try {
        User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ message: "Profile successfully updated!" });
    } catch (err) {
        res.status(500).send(`${err}`);
    }
});

router.post(
    "/tutor",
    [auth.isLoginNeeded, auth.loadUserDataFromJwtSession],
    async (req, res) => {
        const plainTutor = await User.findOne({
            where: { username: req.body.tutorUsername, isTutor: true },
        });
        if (!plainTutor) {
            // TODO: replace .send with a view modification
            res.status(404).send(
                "This Tutor does not exist or that user is not a tutor"
            );
        }
        const tempTutor = searchedTutor.get({ plain: true });
        res.render("tutors", { plainTutor });
    }
);

// router.get("/logout", (req, res) => {
//     if (req.session.logged_in) {
//         req.session.reset();
//     }
//     res.redirect("/");
// });

// router.get("/test", (req, res) => {
//     console.log(req.session);
// });

module.exports = router;
