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
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    // creating User Model after registration
    // TODO: find more optiam solution for next two if statements
    const userData = {
        username: req.body.username,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        isTutor: req.body.isTutor,
    };
    const userRegistration = await User.create(userData);
    req.session.save(() => {
        req.session.user_id = userRegistration.id;
        req.session.logged_in = true;

        res.status(201);
    });

    // TODO: if (isTutor === true) {res.render('quiz')}
    // users.push(req.body);
    // res.status(201).send(req.body);
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
