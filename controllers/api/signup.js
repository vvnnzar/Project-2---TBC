const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

let users = [];

router.post("/", async (req, res) => {
    console.log(req.body.password);
    // hashing password
    let hashedPass = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPass;
    // dealing with response
    users.push(req.body);
    res.status(201).send(req.body);
});

router.get("/", (req, res) => {
    res.send(users);
});

router.post("/login", async (req, res) => {
    const user = users.find((user) => user.username === req.body.username);
    console.log(user);
    if (!user) {
        res.status(404).redirect("/").render("signup");
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send("logged in");
        } else {
            res.status(404).send("Incorrect Password");
        }
    } catch {
        res.status(500).send("whoops");
    }
});

module.exports = router;
