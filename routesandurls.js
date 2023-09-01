const express = require('express');
const jwt = require('jsonwebtoken');
const Url = require('../models/url');

const router = express.Router();

router.post('/shorten', async (req, res) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied.');

    try {
        const verified = jwt.verify(token, 'YOUR_SECRET_KEY');

        const shortUrl = generateShortUrl();
        const url = new Url({
            longUrl: req.body.longUrl,
            shortUrl: shortUrl,
            user: verified._id
        });
        await url.save();

        res.send(shortUrl);
    } catch (err) {
        res.status(400).send('Invalid Token.');
    }
});

function generateShortUrl() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'http://short.url/';
    for (let i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

module.exports = router;
