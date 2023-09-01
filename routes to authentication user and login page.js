const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(400).send('User already registered.');

    const user = new User(req.body);
    await user.save();

    const token = jwt.sign({ _id: user._id }, 'YOUR_SECRET_KEY');
    res.header('auth-token', token).send('Registered and logged in.');
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password is wrong.');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Email or password is wrong.');

    const token = jwt.sign({ _id: user._id }, 'YOUR_SECRET_KEY');
    res.header('auth-token', token).send('Logged in.');
});

module.exports = router;
