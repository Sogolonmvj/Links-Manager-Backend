const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models');
const { accountSignUp } = require('../validators/account');
const { getMessage } = require('../helpers/validator');

const router = express.Router();

const saltRounds = 10;

router.get('/log-in', (req, res) => {
    return res.jsonOK(null);
});

router.get('/sign-up', accountSignUp, async (req, res) => {

    const { email, password } = req.body;
    
    console.log({email, password});
    
    const account = await Account.findOne({ where: { email } });
    if (account)  return res.jsonBadRequest(null, getMessage('account.signup.email_exists'));

    const hash = bcrypt.hashSync(password, saltRounds);
    const newAccount = await Account.create({ email, password: hash });
    console.log(newAccount);

    return res.jsonOK(newAccount, getMessage('account.signup.success'));
});

module.exports = router;