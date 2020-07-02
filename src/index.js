const express = require('express');

const authController = require('./controllers/auth');

const app = express();

// auth/log-in
// auth/sign-up
app.use('/auth', authController);

app.get('/', (req, res) => {
    return res.json('Api running...');
})

app.listen(3001, () => {
    console.log('Listening on port 3001');
})