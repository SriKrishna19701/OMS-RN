const OutpassRequest = require('../models/OutpassRequest');
const User = require('../models/User');
const { generateQrCode } = require('../services/qrServices');

// Get Count of Mentored Students
exports.getMentoredStudentsCount = async (req, res) => {
    try {
        const mentorId = req.user.userId;
        console.log('Fetching count for mentorId:', mentorId);
        const count = await User.countDocuments({ mentorId, role: 'student' });
        console.log('Count Success:', count);
        res.json({ count });
    } catch (err) {
        console.error('Count Error:', err);
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
};

// Assigned Requests
exports.getAssignedRequests = async (req, res) => {
    try {
        const mentorId = req.user.userId;
        console.log('Fetching requests for mentorId:', mentorId);
        const requests = await OutpassRequest.find({ mentorId }).populate('studentId', 'name email').sort({ createdAt: -1 });
        console.log('Requests Success:', requests.length);
        res.json(requests);
    } catch (err) {
        console.error('Requests Error:', err);
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
};

// Approve Request
exports.approveRequest = async (req, res) => {
    try {
        const mentorId = req.user.userId;
        const {id} = req.params;
         
        const request = await OutpassRequest.findById(id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        if (request.mentorId.toString() !== mentorId) {
            return res.status(403).json({ message: 'Access denied: Not your assigned request' });
        }
        if (request.status !== 'pending') {
            return res.status(400).json({ message: 'Request already processed' });
        }

        request.status = 'approved';
        request.approvedBy = mentorId;
        request.approvedAt = new Date();

        const payload = {
            requestId: request._id.toString(),
            studentId: request.studentId.toString(),
            mentorId: request.mentorId.toString(),
            validTill: request.toDate.toISOString(),
            approvedAt: request.approvedAt.toISOString()
        };

        request.qrCode = await generateQrCode(payload);
        await request.save();

        res.json({ message: 'Request approved successfully' });

        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// reject request
exports.rejectRequest = async (req, res) => {
    try {
        const mentorId = req.user.userId;
        const {id} = req.params;
         
        const request = await OutpassRequest.findById(id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        if (request.mentorId.toString() !== mentorId) {
            return res.status(403).json({ message: 'Access denied: Not your assigned request' });
        }
        if (request.status !== 'pending') {
            return res.status(400).json({ message: 'Request already processed' });
        }

        request.status = 'rejected';
        request.approvedBy = mentorId;
        request.approvedAt = new Date();
        await request.save();

        res.json({ message: 'Request rejected successfully' }); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};  