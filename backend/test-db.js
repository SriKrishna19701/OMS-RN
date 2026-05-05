const mongoose = require('mongoose');
const User = require('./models/User');
const OutpassRequest = require('./models/OutpassRequest');
require('dotenv').config();

async function test() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/oms');
        console.log('Connected to DB');

        // Test student count (using a mock mentorId)
        const mockMentorId = new mongoose.Types.ObjectId(); 
        console.log('Testing student count for mentor:', mockMentorId);
        const count = await User.countDocuments({ mentorId: mockMentorId, role: 'student' });
        console.log('Count Success:', count);

        // Test requests fetch
        console.log('Testing requests fetch...');
        const requests = await OutpassRequest.find({}).populate('studentId', 'name email').sort({ createdAt: -1 }).limit(1);
        console.log('Requests Success:', requests.length);

        process.exit(0);
    } catch (err) {
        console.error('TEST FAILED:', err);
        process.exit(1);
    }
}

test();
