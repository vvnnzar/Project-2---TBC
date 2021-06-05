const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { User } = require("../../models");

router.post("/signup", async (req, res) => {
    console.log(req.body);
    // hashing password
    // req.body.password = await bcrypt.hash(req.body.password, 10);
    // creating User Model after registration
    if (!req.body.password === req.body.confirmPassword) {
        // TODO: trigger Handle Bars if statment
    }

    // TODO: find more optiam solution for next two ifd statements
    if (!req.body.isTutor) {
        req.body.isTutor = false;
    }

    if (req.body.isTutor === "on") {
        req.body.isTutor = true;
    }
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

        res.status(201).json(userRegistration);
    });
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
    console.log("this is current" + currentUser);
    try {
        // if (await bcrypt.compare(req.body.password, currentUser.password)) {
        res.status(302).redirect("/");
        // } else {
        //     res.status(404).send("Incorrect Password");
        // }
    } catch (err) {
        res.status(500).send(`${err}`);
    }
});

module.exports = router;
