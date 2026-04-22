const Outpass = require('../models/Outpass');
const User = require('../models/User');

exports.createOutpassRequest = async (req, res) => {
    try {
        const { reason, fromDate, toDate } = req.body;
        const studentId = req.user.userId;
        const role = req.user.role;

        if (role !== 'student') {
            return res.status(403).json({ message: 'Access denied: Students only' });
        }
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        // Count outpass requests for the current month for the student
        const outpassCount = await Outpass.countDocuments({
            studentId,
            createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        });

        if (outpassCount >= 3) {
            return res.status(400).json({ message: 'Outpass request limit reached for this month' });
        }   

        // Find the student and their mentor
        const student = await User.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const mentorId = student.mentorId;
        if (!mentorId) {
            return res.status(400).json({ message: 'No mentor assigned to student' });
        }
        // VALIDATE DATES
        const from = new Date(fromDate);
        const to = new Date(toDate);

        if (isNaN(from) || isNaN(to)) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        if (from > to) {
            return res.status(400).json({ message: 'From date cannot be after To date' });
        }

        // Create new outpass request
        const outpassRequest = new Outpass({
            studentId,
            mentorId,
            reason,
            fromDate,
            toDate,
            status: 'pending'
        });

        await outpassRequest.save();

        res.status(201).json({ message: 'Outpass request created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};