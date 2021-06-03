// const express = require("express");
const router = require("express").Router();

// const withAuth = require("./auth");
//
// router.get("/", (req, res) => {
//     res.render("index.html");
// });
//
// router.get("/questions/ask", withAuth, (req, res) => {
//     // assign user data to an object
//
//     // renders the ask question page after the authentication middlewear has been ran
//     // adds user data to the rendered page
//     res.render("askQuestionPage", { userobj: JSON.stringify(userdetails) });
// });

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

// router.get("/questions/ask", authMiddleWearGoesHere, (req, res) => {
//     // assign user data to an object

//     // renders the ask question page after the authentication middlewear has been ran
//     // adds user data to the rendered page
//     res.render("askQuestionPage", { userobj: JSON.stringify(userdetails) });
// });
<<<<<<< HEAD

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
=======
>>>>>>> ecf9603 (minor updates)

module.exports = router;
