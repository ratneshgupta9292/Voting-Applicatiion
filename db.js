require('dotenv').config(); // ← Load env vars

const mongoose = require('mongoose');

const mongoURL = process.env.MONGODB_URI;

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB connected');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

module.exports = db;