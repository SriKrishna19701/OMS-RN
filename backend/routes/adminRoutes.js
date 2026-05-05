const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const { adminRole } = require('../middleware/roleMiddleware');

router.use(authMiddleware);
router.use(adminRole);

router.get('/requests', adminController.getAssignedRequests);
router.get('/students/count', adminController.getMentoredStudentsCount);
router.put('/requests/:id/approve', adminController.approveRequest);
router.put('/requests/:id/reject', adminController.rejectRequest);

module.exports = router;