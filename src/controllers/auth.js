const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models');

const router = express.Router();

const saltRounds = 10;

router.get('/log-in', (req, res) => {
    return res.json('Log in');
});

router.get('/sign-up', async (req, res) => {

    const email = 'sogolonmd@gmail.com'
    const password = 'sha256'

    
    const hash = bcrypt.hashSync(password, saltRounds);


    const result = await Account.create({ email, password: hash });
    console.log(result);

    return res.json(result);
});

module.exports = router;