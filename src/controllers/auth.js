const express = require('express');

const router = express.Router();

router.get('/log-in', (req, res) => {
    return res.json('Log in');
});

router.get('/sign-up', (req, res) => {
    return res.json('Sign up');
});

module.exports = router;