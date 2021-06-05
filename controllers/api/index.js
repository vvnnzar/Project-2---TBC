const router = require("express").Router();
const userRoutes = require("./userRoutes");
// const questionRoutes = require('./questionRoutes');
// const commentRoutes = require('./commentRoutes');

router.use(userRoutes);
router.use("/questions", questionRoutes);
// router.use('/comments', commentRoutes);

module.exports = router;
