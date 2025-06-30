const cloudinary = require('cloudinary').v2;
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// @desc    Upload single image
// @route   POST /api/upload/image
// @access  Private
const uploadImage = async (req, res, next) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }

    const file = req.files.image;

    // Check file type
    if (!file.mimetype.startsWith('image/')) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file'
      });
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: 'File size must be less than 5MB'
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'artisan-app',
      use_filename: true,
      unique_filename: true
    });

    res.status(200).json({
      success: true,
      data: {
        public_id: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload multiple images
// @route   POST /api/upload/images
// @access  Private
const uploadMultipleImages = async (req, res, next) => {
  try {
    if (!req.files || !req.files.images) {
      return res.status(400).json({
        success: false,
        message: 'Please upload images'
      });
    }

    const files = Array.isArray(req.files.images) 
      ? req.files.images 
      : [req.files.images];

    const uploadPromises = files.map(async (file) => {
      // Check file type
      if (!file.mimetype.startsWith('image/')) {
        throw new Error('Please upload image files only');
      }

      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB');
      }

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: 'artisan-app',
        use_filename: true,
        unique_filename: true
      });

      return {
        public_id: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height
      };
    });

    const results = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete image
// @route   DELETE /api/upload/image/:publicId
// @access  Private
const deleteImage = async (req, res, next) => {
  try {
    const { publicId } = req.params;

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      res.status(200).json({
        success: true,
        message: 'Image deleted successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to delete image'
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Upload avatar
// @route   POST /api/upload/avatar
// @access  Private
const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.files || !req.files.avatar) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an avatar image'
      });
    }

    const file = req.files.avatar;

    // Check file type
    if (!file.mimetype.startsWith('image/')) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file'
      });
    }

    // Check file size (2MB max for avatars)
    if (file.size > 2 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: 'Avatar size must be less than 2MB'
      });
    }

    // Upload to Cloudinary with avatar-specific settings
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'artisan-app/avatars',
      use_filename: true,
      unique_filename: true,
      transformation: [
        { width: 200, height: 200, crop: 'fill', gravity: 'face' }
      ]
    });

    res.status(200).json({
      success: true,
      data: {
        public_id: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload portfolio images
// @route   POST /api/upload/artisan/portfolio
// @access  Private (Artisan)
const uploadPortfolioImages = async (req, res, next) => {
  try {
    if (!req.files || !req.files.images) {
      return res.status(400).json({
        success: false,
        message: 'Please upload portfolio images'
      });
    }

    const files = Array.isArray(req.files.images) 
      ? req.files.images 
      : [req.files.images];

    const uploadPromises = files.map(async (file) => {
      // Check file type
      if (!file.mimetype.startsWith('image/')) {
        throw new Error('Please upload image files only');
      }

      // Check file size (10MB max for portfolio)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('Portfolio image size must be less than 10MB');
      }

      // Upload to Cloudinary with portfolio-specific settings
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: 'artisan-app/portfolio',
        use_filename: true,
        unique_filename: true,
        transformation: [
          { width: 800, height: 600, crop: 'limit', quality: 'auto' }
        ]
      });

      return {
        public_id: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height
      };
    });

    const results = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadImage,
  uploadMultipleImages,
  deleteImage,
  uploadAvatar,
  uploadPortfolioImages
}; 