const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { User } = require("../../models");
require("dotenv").config();

// router.post("/", async (req, res) => {
//     try {
//         const userData = await User.create(req.body);

//         req.session.save(() => {
//             req.session.user_id = userData.id;
//             req.session.logged_in = true;

//             res.status(200).json(userData);
//         });
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

router.post("/signup", async (req, res) => {
    console.log(req.body);
    // hashing password
    // console.log(req.body.username);
    // console.log("password: " + req.body.password);
    const salt = bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
        req.body.bodyContent.password,
        salt
    );
    // creating User Model after registration
    const userData = {
        username: req.body.bodyContent.username,
        firstName: req.body.bodyContent.firstName,
        lastName: req.body.bodyContent.lastName,
        email: req.body.bodyContent.email,
        password: req.body.bodyContent.password,
        isTutor: req.body.bodyContent.isTutor,
    };
    const userRegistration = await User.create(userData);
    console.log("user created");
    req.session.save(() => {
        req.session.user_id = userRegistration.id;
        req.session.logged_in = true;
    });
    console.log("session created");
    res.status(201).json();
    // TODO: if (isTutor === true) {res.render('quiz')}
    // users.push(req.body);

    // handle unique username
});

router.post("/login", async (req, res) => {
    const currentUser = await User.findOne({
        where: { username: req.body.username },
    });
    if (!currentUser) {
        res.status(404).send("Incorrect User name, would you like to sign up?");
    }
    try {
        if (await bcrypt.compare(req.body.password, currentUser.password)) {
            res.status(302).redirect("/");
        } else {
            res.status(404).send("Incorrect Password");
        }
    } catch (err) {
        res.status(500).send(`${err}`);
    }
});

// router.post("/tutor", async (req, res) => {
//     const plainTutor = await User.findOne({
//         where: { username: req.body.tutorUsername },
//     });
//     if (!searchedTutor) {
//         // TODO: replace .send with a view modification
//         res.status(404).send(
//             "This Tutor does not exist or that user is not a tutor"
//         );
//     }
//     const plainTutor = searchedTutor.get({ plain: true });
//     res.render("tutors", { plainTutor });
// });

module.exports = router;
