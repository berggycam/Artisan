const express = require('express');
const router = express.Router();

const {
  uploadImage,
  uploadMultipleImages,
  deleteImage,
  uploadAvatar,
  uploadPortfolioImages
} = require('../controllers/upload');

const { protect, protectArtisan } = require('../middleware/auth');

// Routes
router.use(protect); // All routes require authentication

router.post('/image', uploadImage);
router.post('/images', uploadMultipleImages);
router.delete('/image/:publicId', deleteImage);
router.post('/avatar', uploadAvatar);

// Artisan specific routes
router.use('/artisan', protectArtisan);
router.post('/artisan/portfolio', uploadPortfolioImages);

module.exports = router; 