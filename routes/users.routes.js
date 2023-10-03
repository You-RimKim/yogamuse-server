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


// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const User = require('../models/userModel'); // Assuming your model is defined in this file

// // Middleware to check if a user is authenticated (you can customize this based on your authentication strategy)
// const isAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.status(401).json({ message: 'Unauthorized' });
// };

// // PUT (update) user profile by ID
// router.put('/api/user/:_id', isAuthenticated, [
//   check('email', 'Email is required').isEmail(),
//   check('name', 'Name is required').notEmpty(),
// ], async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const { email, name } = req.body;

//     // Check if the user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Update user information
//     user.email = email;
//     user.name = name;

//     // Save the updated user
//     await user.save();

//     res.json({ message: 'User updated successfully', user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // DELETE user profile by ID
// router.delete('/api/user/:_id', isAuthenticated, async (req, res) => {
//   try {
//     const userId = req.params.id;

//     // Check if the user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Delete the user
//     await user.remove();

//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;
