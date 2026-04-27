const express = require('express');
const router = express.Router();
const outpassController = require('../controllers/outpassController');
const authMiddleware = require('../middleware/authMiddleware');
const { studentRole } = require('../middleware/roleMiddleware');

router.use(authMiddleware);
router.use(studentRole);

router.post('/outpass', outpassController.createOutpassRequest);
router.get('/outpass', outpassController.getOutpassRequests);

module.exports = router;