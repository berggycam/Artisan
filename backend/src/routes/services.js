const express = require('express');
const { body, query } = require('express-validator');
const router = express.Router();

const {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  getServiceCategories,
  getServicesByCategory,
  searchServices
} = require('../controllers/services');

const { protect, protectArtisan, optionalAuth } = require('../middleware/auth');

// Validation middleware
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
    .withMessage('Category is required'),
  body('isAvailable')
    .optional()
    .isBoolean()
    .withMessage('isAvailable must be boolean')
];

const validateServiceUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Service name must be between 2 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Service description must be between 10 and 500 characters'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Service price must be positive'),
  body('duration')
    .optional()
    .isInt({ min: 15 })
    .withMessage('Service duration must be at least 15 minutes'),
  body('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  body('isAvailable')
    .optional()
    .isBoolean()
    .withMessage('isAvailable must be boolean')
];

const validateServiceFilters = [
  query('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Category cannot be empty'),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be positive'),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be positive'),
  query('isAvailable')
    .optional()
    .isBoolean()
    .withMessage('isAvailable must be boolean')
];

// Public routes
router.get('/', validateServiceFilters, optionalAuth, getServices);
router.get('/categories', getServiceCategories);
router.get('/categories/:category', getServicesByCategory);
router.get('/search', searchServices);
router.get('/:id', optionalAuth, getService);

// Protected routes (require artisan authentication)
router.use(protectArtisan);

router.route('/')
  .post(validateService, createService);

router.route('/:id')
  .put(validateServiceUpdate, updateService)
  .delete(deleteService);

module.exports = router; 