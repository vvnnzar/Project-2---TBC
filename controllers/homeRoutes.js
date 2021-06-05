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
  res.render("homepage");
  return;
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

//profile
router.get("/profile", async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const currentUser = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        { model: Reputation },
        { model: QuizResult },
        { model: IsTutor },
      ],
    });

    const user = currentUser.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
