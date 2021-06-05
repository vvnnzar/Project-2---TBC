const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { User } = require("../../models");

router.post("/", async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/signup", async (req, res) => {
    // TODO: find more optiam solution for next two ifd statements
    if (!req.body.isTutor) {
        req.body.isTutor = false;
    }

    if (req.body.isTutor === "on") {
        req.body.isTutor = true;
    }

    const userRegistration = await User.create(req.body);
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
