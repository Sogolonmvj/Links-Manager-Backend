const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models');
const { accountSignUp, accountLogIn } = require('../validators/account');
const { getMessage } = require('../helpers/validator');
const { generateJwt, generateRefreshJwt } = require('../helpers/jwt');

const router = express.Router();

const saltRounds = 10;

router.post('/log-in', accountLogIn, async (req, res) => {

    const { email, password } = req.body;
    const account = await Account.findOne({ where: { email } });

    //  validar a senha
    const match = account ? bcrypt.compareSync(password, account.password) : null;
    if (!match) return res.jsonBadRequest(null, getMessage('account.login.invalid'));

    const token = generateJwt({ id: account.id });
    const refreshToken = generateRefreshJwt({ id: account.id, version: account.jwtVersion });
    
    return res.jsonOK(account, getMessage('account.login.success'), { token, refreshToken });
});

router.post('/sign-up', accountSignUp, async (req, res) => {

    const { email, password } = req.body;
    
    console.log({email, password});
    
    const account = await Account.findOne({ where: { email } });
    if (account)  return res.jsonBadRequest(null, getMessage('account.signup.email_exists'));

    const hash = bcrypt.hashSync(password, saltRounds);
    const newAccount = await Account.create({ email, password: hash });
    console.log(newAccount);

    const token = generateJwt({id: newAccount.id});
    const refreshToken = generateRefreshJwt({ id: newAccount.id, version: newAccount.jwtVersion });

    return res.jsonOK(newAccount, getMessage('account.signup.success'), { token, refreshToken });
});

module.exports = router;