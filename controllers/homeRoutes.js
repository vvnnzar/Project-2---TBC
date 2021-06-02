const router = require('express').Router();
// const { User, IsTutor, Comment, Question, Reputation, QuizResult } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    res.render('homepage');
    return;
});


router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});


module.exports = router;