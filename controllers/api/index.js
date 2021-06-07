const router = require("express").Router();
const userRoutes = require("./userRoutes");
const questionRoutes = require('./questionRoutes');
const commentRoutes = require('./commentRoutes');
const noteRoutes = require ('./noteRoutes')

router.use("/users", userRoutes);
router.use("/questions", questionRoutes);
router.use("/comments", commentRoutes);
router.use("/notes", noteRoutes);

module.exports = router;
