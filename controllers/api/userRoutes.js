const router = require("express").Router();
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
    console.log(req.body.password);
    // hashing password
    let hashedPass = await bcrypt.hash(
        req.body.password,
        process.env.BCRYPT_WORK_FACTOR
    );
    req.body.password = hashedPass;
    // creating User Model after registration

    const userReg = await User.create(req.body);
    users.push(req.body);
    res.status(201).send(req.body);
});

router.post("/login", async (req, res) => {
    const currentUser = User.findOne({
        where: { username: req.bodt.username },
    });
    if (!currentUser) {
        res.status(404).redirect("/signup").render("signup");
    }
    try {
        if (await bcrypt.compare(req.body.password, currentUser.password)) {
            res.send("logged in");
        } else {
            res.status(404).send("Incorrect Password");
        }
    } catch {
        res.status(500).send("Server Error");
    }
});

module.exports = router;
