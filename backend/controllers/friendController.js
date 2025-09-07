const FriendRequest = require('../models/FriendRequest');
const User = require('../models/User');

exports.sendFriendRequest = async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.user.id;

  try {
    // Check if a request already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already sent or you are already friends' });
    }

    const friendRequest = await FriendRequest.create({
      sender: senderId,
      receiver: receiverId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.respondToFriendRequest = async (req, res) => {
  const { requestId, status } = req.body; // status can be 'accepted' or 'rejected'
  const receiverId = req.user.id;

  try {
    const request = await FriendRequest.findById(requestId);

    if (!request || request.receiver.toString() !== receiverId) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    if (status === 'accepted') {
      request.status = 'accepted';
      // Add users to each other's friends list (implementation depends on your User model)
      // For simplicity, we're not adding a friends array to the User model in this example
    } else if (status === 'rejected') {
      request.status = 'rejected';
    } else {
      return res.status(400).json({ message: 'Invalid status' });
    }

    await request.save();
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFriendRequests = async (req, res) => {
  const userId = req.user.id;

  try {
    const requests = await FriendRequest.find({ receiver: userId, status: 'pending' }).populate('sender', 'username profilePicture');
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
