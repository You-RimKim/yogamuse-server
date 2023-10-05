const express = require('express');
const router = express.Router();
const User = require("../models/User.model");

router.get('/user', async (req, res) => {
  const userId = req.payload._id;
  console.log(userId)

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Server error', error: error });
    });
});

// Update user profile by ID
router.put('/user', (req, res) => {
  const userId = req.payload._id;
  const updatedUserInfo = req.body;
  console.log(userId)

  User.findByIdAndUpdate(userId, updatedUserInfo, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Server error', error: error });
    });
});

// Delete user profile by ID
router.delete('/user', (req, res) => {
  const userId = req.payload._id;
  console.log(userId)

  User.findByIdAndRemove(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted', user: user });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Server error', error: error });
    });
});

// Logout user
router.post('/logout', (req, res) => {

  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;