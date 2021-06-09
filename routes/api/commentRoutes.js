const router = require('express').Router();
const { Comment } = require('../../models');
const auth = require('../auth');

router.post('/', async (req, res) => {
    try {
        const payload = auth.extractPayload(req, res);
        let {
            logged_in: logged_in,
            userid: user_id,
            username: name,
        } = payload || { logged_in: false };

        const newComment = await Comment.create({
            ...req.body,
            user_id: user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;