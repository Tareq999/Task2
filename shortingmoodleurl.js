const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
