const express = require('express');
const { query } = require('express-validator');
const router = express.Router();

const {
  searchArtisans,
  searchJobs,
  getSearchSuggestions,
  getSearchCategories,
  getRecentSearches,
  saveRecentSearch
} = require('../controllers/search');

const { protect, protectArtisan, optionalAuth } = require('../middleware/auth');

// Validation middleware
const validateSearchParams = [
  query('q')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Search query must be at least 2 characters'),
  query('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Category cannot be empty'),
  query('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be positive'),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be positive'),
  query('radius')
    .optional()
    .isFloat({ min: 1, max: 200 })
    .withMessage('Radius must be between 1 and 200 km'),
  query('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Invalid latitude'),
  query('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Invalid longitude'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('sortBy')
    .optional()
    .isIn(['rating', 'price', 'distance', 'experience', 'reviews', 'date', 'budget', 'urgency'])
    .withMessage('Invalid sort field'),
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc')
];

// Public routes
router.get('/artisans', validateSearchParams, optionalAuth, searchArtisans);
router.get('/suggestions', optionalAuth, getSearchSuggestions);
router.get('/categories', optionalAuth, getSearchCategories);

// Protected routes
router.get('/jobs', validateSearchParams, protectArtisan, searchJobs);
router.get('/recent', protect, getRecentSearches);
router.post('/recent', protect, saveRecentSearch);

module.exports = router; 