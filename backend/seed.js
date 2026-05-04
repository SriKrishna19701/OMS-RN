require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const connectDB = require('./config/db');

const seedDatabase = async () => {
    try {
        await connectDB();
        
        // Clear any existing test users to prevent duplicates
        await User.deleteMany({ email: { $in: ['admin@test.com', 'student@test.com'] } });

        const adminPassword = await bcrypt.hash('admin123', 10);
        const studentPassword = await bcrypt.hash('student123', 10);

        const adminUser = new User({
            name: 'System Admin',
            email: 'admin@test.com',
            password: adminPassword,
            role: 'admin',
        });

        await adminUser.save();

        const studentUser = new User({
            name: 'Test Student',
            email: 'student@test.com',
            password: studentPassword,
            role: 'student',
            mentorId: adminUser._id
        });

        await studentUser.save();

        console.log('Admin and Student users seeded successfully!');
        console.log('Admin -> admin@test.com : admin123');
        console.log('Student -> student@test.com : student123');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
