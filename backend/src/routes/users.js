const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile,
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavoriteStatus,
  shareArtisan,
  blockUser,
  unblockUser,
  getBlockedUsers
} = require('../controllers/users');

const { protect, protectUser } = require('../middleware/auth');

// Validation middleware
const validateUserUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio cannot be more than 500 characters'),
  body('location.latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Invalid latitude'),
  body('location.longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Invalid longitude')
];

// Public routes
router.get('/share/:artisanId', shareArtisan);

// Protected routes (require user authentication)
router.use(protectUser);

router.route('/profile/me')
  .get(getProfile)
  .put(validateUserUpdate, updateProfile);

// Favorites routes
router.get('/favorites', getFavorites);
router.post('/favorites/:artisanId', addFavorite);
router.delete('/favorites/:artisanId', removeFavorite);
router.get('/favorites/:artisanId', checkFavoriteStatus);

// Blocking routes
router.post('/block/user/:userId', blockUser);
router.delete('/block/user/:userId', unblockUser);
router.get('/blocked/users', getBlockedUsers);

// Admin routes
router.route('/')
  .get(getUsers);

router.route('/:id')
  .get(getUser)
  .put(validateUserUpdate, updateUser)
  .delete(deleteUser);

module.exports = router; 