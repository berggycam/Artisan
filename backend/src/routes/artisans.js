const express = require('express');
const { body, query } = require('express-validator');
const router = express.Router();

const {
  getArtisans,
  getArtisan,
  updateArtisan,
  deleteArtisan,
  updateProfile,
  updateLocation,
  updateServices,
  addService,
  updateService,
  deleteService,
  addPortfolio,
  updatePortfolio,
  deletePortfolio,
  updateAvailability,
  getReviews,
  addReview,
  updateReview,
  deleteReview,
  getEarnings,
  getAnalytics,
  blockUser,
  unblockUser,
  getBlockedUsers,
  updatePreferences
} = require('../controllers/artisans');

const { protect, protectArtisan, artisanVerified, optionalAuth } = require('../middleware/auth');

// Validation middleware
const validateArtisanUpdate = [
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
  body('experience')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Experience must be a positive number'),
  body('location.latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Invalid latitude'),
  body('location.longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Invalid longitude')
];

const validateService = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Service name must be between 2 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Service description must be between 10 and 500 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Service price must be positive'),
  body('duration')
    .isInt({ min: 15 })
    .withMessage('Service duration must be at least 15 minutes'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
];

const validatePortfolio = [
  body('title')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('images')
    .isArray({ min: 1 })
    .withMessage('At least one image is required'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
];

const validateReview = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Comment must be between 10 and 500 characters')
];

const validateArtisanFilters = [
  query('serviceType')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Service type cannot be empty'),
  query('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  query('radius')
    .optional()
    .isFloat({ min: 1, max: 200 })
    .withMessage('Radius must be between 1 and 200 km'),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be positive'),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be positive'),
  query('isOnline')
    .optional()
    .isBoolean()
    .withMessage('isOnline must be boolean'),
  query('isVerified')
    .optional()
    .isBoolean()
    .withMessage('isVerified must be boolean')
];

// Public routes
router.get('/', validateArtisanFilters, optionalAuth, getArtisans);
router.get('/:id', optionalAuth, getArtisan);
router.get('/:id/reviews', getReviews);

// Protected routes (require artisan authentication)
router.use(protectArtisan);

router.route('/profile/me')
  .get(getProfile)
  .put(validateArtisanUpdate, updateProfile);

router.put('/location', updateLocation);
router.put('/services', updateServices);

router.route('/services')
  .post(validateService, addService);

router.route('/services/:serviceId')
  .put(validateService, updateService)
  .delete(deleteService);

router.route('/portfolio')
  .post(validatePortfolio, addPortfolio);

router.route('/portfolio/:portfolioId')
  .put(validatePortfolio, updatePortfolio)
  .delete(deletePortfolio);

router.put('/availability', updateAvailability);

router.route('/reviews')
  .post(validateReview, addReview);

router.route('/reviews/:reviewId')
  .put(validateReview, updateReview)
  .delete(deleteReview);

router.get('/earnings', getEarnings);
router.get('/analytics', getAnalytics);

router.post('/block/user/:userId', blockUser);
router.delete('/block/user/:userId', unblockUser);
router.get('/blocked/users', getBlockedUsers);

router.put('/preferences', updatePreferences);

// Admin routes
router.route('/:id')
  .put(validateArtisanUpdate, updateArtisan)
  .delete(deleteArtisan);

module.exports = router; 