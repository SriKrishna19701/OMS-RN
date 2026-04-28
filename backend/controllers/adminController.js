const OutpassRequest = require('../models/OutpassRequest');
const { generateQrCode } = require('../services/qrServices');

// Assigned Requests
exports.getAssignedRequests = async (req, res) => {
    try {
        const mentorId = req.user.userId;
        const requests = (await OutpassRequest.find({ mentorId }).populate('userId', 'name email')).sort({ createdAt: -1 });
        res.json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
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