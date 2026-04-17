const monngoose = require('mongoose');
require('dotenv').config();


const uri = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await monngoose.connect(uri);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        throw err;
    }
};

module.exports = connectDB; 