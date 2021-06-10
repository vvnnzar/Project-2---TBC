const router = require("express").Router();
const { Question } = require("../../models");
const auth = require('../auth');

router.post("/", async (req, res) => {
    const payload = auth.extractPayload(req, res);
    let {
        logged_in: logged_in,
        userid: user_id,
        username: name,
    } = payload || { logged_in: false };
    try {
        const newQuestion = await Question.create({
            question_title: req.body.title,
            question_text: req.body.text,
            user_id: user_id,
        });

        res.status(200).json(newQuestion);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("/:id", async (req, res) => {
    const payload = auth.extractPayload(req, res);
    let {
        logged_in: logged_in,
        userid: user_id,
        username: name,
    } = payload || { logged_in: false };
    try {
        const questionData = await Question.findOne({where: {id: req.params.id, user_id: user_id}});

        if (!questionData) {
            res.status(404);
            return;
        }

        const question = questionData.get();

        const newQuestion = await Question.update({
            question_title: req.body.title,
            question_text: req.body.text,
        }, {where: {id: question.id}});


        res.status(200).json(newQuestion);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const payload = auth.extractPayload(req, res);
        let {
            logged_in: logged_in,
            userid: user_id,
            username: name,
        } = payload || { logged_in: false };
        const questionData = await Question.destroy({
            where: {
                id: req.params.id,
                user_id: user_id,
            },
        });

        if (!questionData) {
            res.status(404).json({message: 'No question found with this id'});
            return;
        }
        res.status(200).json(questionData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
