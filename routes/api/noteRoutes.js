
const router = require("express").Router();
const { Note } = require("../../models");


router.post("/", async (req, res) => {
    const {} = req.body;
    try {
        const newNote = await Note.create({
            note_title: req.body.title,
            note_text: req.body.text,
            user_id: req.session.user_id,
        });
        res.status(200).json(newNote);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const noteData = await Note.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (noteData.length === 0) {
            res.status(404).json({ message: "No note with this id!" });
            return;
        }
        res.status(200).json(noteData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const noteData = await Note.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!noteData) {
            res.status(404).json({ message: "No note found with this id" });
            return;
        }
        res.status(200).json(noteData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
