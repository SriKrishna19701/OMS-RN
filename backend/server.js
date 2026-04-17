const express = require('express');
const cors = require('cors');
const { connect } = require('mongoose');
const app = express();
const connectDB = require('./config/db');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/health', (req, res) => {
    res.send('Server is healthy!');
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database', err);
});