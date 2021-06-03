const router = require("express").Router();
const userRoutes = require("./userRoutes");
const signup = require("./signup");
// const questionRoutes = require('./questionRoutes');
// const commentRoutes = require('./commentRoutes');
router.use("/signup", signup);
router.use("/users", userRoutes);
// router.use('/questions', questionRoutes);
// router.use('/comments', commentRoutes);

module.exports = router;
