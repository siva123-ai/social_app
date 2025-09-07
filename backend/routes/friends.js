const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/send-request', authMiddleware, friendController.sendFriendRequest);
router.put('/respond-request', authMiddleware, friendController.respondToFriendRequest);
router.get('/requests', authMiddleware, friendController.getFriendRequests);

module.exports = router;
