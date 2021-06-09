const router = require("express").Router();
const { Note, User } = require("../../models");
const auth = require("../auth");

router.get("/", async (req, res) => {
    try {
        const noteData = await Note.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });
        const notes = noteData.map((note) => note.get({ plain: true }));

        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    const payload = auth.extractPayload(req, res);
    let {
        logged_in: logged_in,
        userid: user_id,
        username: name,
    } = payload || { logged_in: false };
    const {} = req.body;
    try {
        const newNote = await Note.create({
            note_title: req.body.title,
            note_text: req.body.text,
            user_id: user_id,
        });
        res.status(200).json(newNote);
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
        const noteData = await Note.update(req.body, {
            where: {
                id: req.params.id,
                user_id: user_id,
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
    const payload = auth.extractPayload(req, res);
    let {
        logged_in: logged_in,
        userid: user_id,
        username: name,
    } = payload || { logged_in: false };
    try {
        const noteData = await Note.destroy({
            where: {
                id: req.params.id,
                user_id: user_id,
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
