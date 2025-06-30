const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  registerUser,
  registerArtisan,
  loginUser,
  loginArtisan,
  logout,
  getMe,
  updatePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification,
  refreshToken
} = require('../controllers/auth');

const { protect } = require('../middleware/auth');

// Validation middleware
const validateRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('location.latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Invalid latitude'),
  body('location.longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Invalid longitude')
];

const validateArtisanRegistration = [
  ...validateRegistration,
  body('experience')
    .isInt({ min: 0 })
    .withMessage('Experience must be a positive number'),
  body('services')
    .isArray({ min: 1 })
    .withMessage('At least one service is required'),
  body('services.*.name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Service name must be between 2 and 100 characters'),
  body('services.*.description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Service description must be between 10 and 500 characters'),
  body('services.*.price')
    .isFloat({ min: 0 })
    .withMessage('Service price must be positive'),
  body('services.*.duration')
    .isInt({ min: 15 })
    .withMessage('Service duration must be at least 15 minutes')
];

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const validatePasswordUpdate = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
];

const validateForgotPassword = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
];

const validateResetPassword = [
  body('token')
    .notEmpty()
    .withMessage('Reset token is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

// Routes
router.post('/register/user', validateRegistration, registerUser);
router.post('/register/artisan', validateArtisanRegistration, registerArtisan);
router.post('/login/user', validateLogin, loginUser);
router.post('/login/artisan', validateLogin, loginArtisan);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.put('/password', protect, validatePasswordUpdate, updatePassword);
router.post('/forgot-password', validateForgotPassword, forgotPassword);
router.put('/reset-password', validateResetPassword, resetPassword);
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', validateForgotPassword, resendVerification);
router.post('/refresh-token', refreshToken);

module.exports = router; 