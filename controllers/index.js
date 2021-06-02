const express = require("express");
const router = express.Router();

const auth = require("./auth");

router.get("/", (req, res) => {
    res.render("index.html");
});

// router.get("/questions/ask", authMiddleWearGoesHere, (req, res) => {
//     // assign user data to an object

//     // renders the ask question page after the authentication middlewear has been ran
//     // adds user data to the rendered page
//     res.render("askQuestionPage", { userobj: JSON.stringify(userdetails) });
// });

module.exports = router;
