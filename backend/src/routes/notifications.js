const express = require('express');
const { body, query } = require('express-validator');
const router = express.Router();

const {
  getNotifications,
  getNotification,
  createNotification,
  updateNotification,
  deleteNotification,
  markAsRead,
  markAllAsRead,
  deleteAllNotifications,
  getUnreadCount,
  sendPushNotification,
  sendEmailNotification,
  sendSMSNotification
} = require('../controllers/notifications');

const { protect, protectArtisan } = require('../middleware/auth');

// Validation middleware
const validateNotification = [
  body('title')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  body('message')
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage('Message must be between 5 and 500 characters'),
  body('type')
    .isIn(['booking', 'payment', 'review', 'system', 'promotion'])
    .withMessage('Invalid notification type'),
  body('recipientId')
    .isMongoId()
    .withMessage('Valid recipient ID is required'),
  body('data')
    .optional()
    .isObject()
    .withMessage('Data must be an object')
];

const validateNotificationUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  body('message')
    .optional()
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage('Message must be between 5 and 500 characters'),
  body('isRead')
    .optional()
    .isBoolean()
    .withMessage('isRead must be boolean')
];

const validateNotificationFilters = [
  query('type')
    .optional()
    .isIn(['booking', 'payment', 'review', 'system', 'promotion'])
    .withMessage('Invalid notification type'),
  query('isRead')
    .optional()
    .isBoolean()
    .withMessage('isRead must be boolean'),
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Valid start date is required'),
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('Valid end date is required')
];

// User routes
router.use(protect);

router.route('/')
  .get(validateNotificationFilters, getNotifications)
  .post(validateNotification, createNotification);

router.route('/:id')
  .get(getNotification)
  .put(validateNotificationUpdate, updateNotification)
  .delete(deleteNotification);

router.put('/:id/read', markAsRead);
router.put('/read-all', markAllAsRead);
router.delete('/all', deleteAllNotifications);
router.get('/unread/count', getUnreadCount);

// Artisan routes
router.use('/artisan', protectArtisan);

router.get('/artisan/notifications', validateNotificationFilters, getNotifications);
router.get('/artisan/notifications/:id', getNotification);
router.put('/artisan/notifications/:id/read', markAsRead);
router.put('/artisan/notifications/read-all', markAllAsRead);
router.delete('/artisan/notifications/all', deleteAllNotifications);
router.get('/artisan/notifications/unread/count', getUnreadCount);

// Admin routes for sending notifications
router.post('/send/push', sendPushNotification);
router.post('/send/email', sendEmailNotification);
router.post('/send/sms', sendSMSNotification);

module.exports = router; 