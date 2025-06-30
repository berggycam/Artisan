const express = require('express');
const { body, query } = require('express-validator');
const router = express.Router();

const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  confirmBooking,
  startBooking,
  completeBooking,
  cancelBooking,
  addReview,
  updateReview,
  deleteReview,
  getBookingAnalytics,
  getUpcomingBookings,
  getPastBookings,
  getBookingHistory
} = require('../controllers/bookings');

const { protect, protectArtisan, verified } = require('../middleware/auth');

// Validation middleware
const validateBooking = [
  body('artisanId')
    .isMongoId()
    .withMessage('Valid artisan ID is required'),
  body('serviceId')
    .notEmpty()
    .withMessage('Service ID is required'),
  body('serviceName')
    .trim()
    .notEmpty()
    .withMessage('Service name is required'),
  body('scheduledDate')
    .isISO8601()
    .withMessage('Valid scheduled date is required'),
  body('scheduledTime')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Valid time format (HH:MM) is required'),
  body('duration')
    .isInt({ min: 15 })
    .withMessage('Duration must be at least 15 minutes'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be positive'),
  body('userLocation.latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Invalid user latitude'),
  body('userLocation.longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Invalid user longitude'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot be more than 500 characters'),
  body('specialRequests')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Special requests cannot be more than 500 characters'),
  body('paymentTiming')
    .optional()
    .isIn(['before_delivery', 'after_delivery'])
    .withMessage('Payment timing must be either before_delivery or after_delivery'),
  body('paymentMethod')
    .optional()
    .isIn(['cash', 'card', 'mobile_money', 'bank_transfer'])
    .withMessage('Invalid payment method')
];

const validateBookingUpdate = [
  body('scheduledDate')
    .optional()
    .isISO8601()
    .withMessage('Valid scheduled date is required'),
  body('scheduledTime')
    .optional()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Valid time format (HH:MM) is required'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot be more than 500 characters'),
  body('specialRequests')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Special requests cannot be more than 500 characters')
];

const validateReview = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('review')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Review must be between 10 and 500 characters')
];

const validateBookingFilters = [
  query('status')
    .optional()
    .isIn(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'])
    .withMessage('Invalid status'),
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Valid start date is required'),
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('Valid end date is required'),
  query('serviceType')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Service type cannot be empty')
];

// User routes
router.use(protect);

router.route('/')
  .get(validateBookingFilters, getBookings)
  .post(validateBooking, verified, createBooking);

router.route('/:id')
  .get(getBooking)
  .put(validateBookingUpdate, updateBooking)
  .delete(deleteBooking);

router.put('/:id/confirm', confirmBooking);
router.put('/:id/start', startBooking);
router.put('/:id/complete', completeBooking);
router.put('/:id/cancel', cancelBooking);

router.route('/:id/review')
  .post(validateReview, addReview)
  .put(validateReview, updateReview)
  .delete(deleteReview);

router.get('/analytics', getBookingAnalytics);
router.get('/upcoming', getUpcomingBookings);
router.get('/past', getPastBookings);
router.get('/history', getBookingHistory);

// Artisan routes
router.use('/artisan', protectArtisan);

router.get('/artisan/bookings', validateBookingFilters, getBookings);
router.get('/artisan/bookings/:id', getBooking);
router.put('/artisan/bookings/:id/confirm', confirmBooking);
router.put('/artisan/bookings/:id/start', startBooking);
router.put('/artisan/bookings/:id/complete', completeBooking);
router.put('/artisan/bookings/:id/cancel', cancelBooking);

router.get('/artisan/analytics', getBookingAnalytics);
router.get('/artisan/upcoming', getUpcomingBookings);
router.get('/artisan/past', getPastBookings);

module.exports = router; 