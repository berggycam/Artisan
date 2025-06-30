const { validationResult } = require('express-validator');
const User = require('../models/User');
const Artisan = require('../models/Artisan');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile/me
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const fieldsToUpdate = {
      name: req.body.name,
      bio: req.body.bio,
      location: req.body.location
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    }).select('-password');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user favorites
// @route   GET /api/users/favorites
// @access  Private
const getFavorites = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .populate({
      path: 'favorites',
      select: 'name avatar bio location rating totalReviews experience isOnline isVerified services',
      populate: {
        path: 'reviews',
        select: 'rating comment userName userAvatar date',
        options: { limit: 3 }
      }
    });

  res.status(200).json({
    success: true,
    count: user.favorites.length,
    data: user.favorites
  });
});

// @desc    Add artisan to favorites
// @route   POST /api/users/favorites/:artisanId
// @access  Private
const addFavorite = asyncHandler(async (req, res, next) => {
  const { artisanId } = req.params;
  const userId = req.user.id;

  // Check if artisan exists
  const artisan = await Artisan.findById(artisanId);
  if (!artisan) {
    return next(new ErrorResponse('Artisan not found', 404));
  }

  // Check if already in favorites
  const user = await User.findById(userId);
  if (user.favorites.includes(artisanId)) {
    return next(new ErrorResponse('Artisan already in favorites', 400));
  }

  // Add to favorites
  user.favorites.push(artisanId);
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Artisan added to favorites',
    data: { artisanId }
  });
});

// @desc    Remove artisan from favorites
// @route   DELETE /api/users/favorites/:artisanId
// @access  Private
const removeFavorite = asyncHandler(async (req, res, next) => {
  const { artisanId } = req.params;
  const userId = req.user.id;

  // Remove from favorites
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { favorites: artisanId } },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: 'Artisan removed from favorites',
    data: { artisanId }
  });
});

// @desc    Check if artisan is in favorites
// @route   GET /api/users/favorites/:artisanId
// @access  Private
const checkFavoriteStatus = asyncHandler(async (req, res, next) => {
  const { artisanId } = req.params;
  const userId = req.user.id;

  const user = await User.findById(userId);
  const isFavorite = user.favorites.includes(artisanId);

  res.status(200).json({
    success: true,
    data: { isFavorite }
  });
});

// @desc    Share artisan profile
// @route   POST /api/users/share/:artisanId
// @access  Public
const shareArtisan = asyncHandler(async (req, res, next) => {
  const { artisanId } = req.params;

  const artisan = await Artisan.findById(artisanId)
    .select('name bio specialty rating experience location');

  if (!artisan) {
    return next(new ErrorResponse('Artisan not found', 404));
  }

  // Generate share URL
  const shareUrl = `${process.env.FRONTEND_URL}/artisan/${artisanId}`;
  
  // Create share content
  const shareContent = {
    title: `${artisan.name} - ${artisan.specialty}`,
    message: `Check out ${artisan.name}, a ${artisan.specialty} with ${artisan.rating}⭐ rating and ${artisan.experience} years of experience. Available in ${artisan.location.address}.`,
    url: shareUrl
  };

  res.status(200).json({
    success: true,
    data: shareContent
  });
});

// @desc    Block user
// @route   POST /api/users/block/user/:userId
// @access  Private
const blockUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user.blockedUsers.includes(req.params.userId)) {
      return res.status(400).json({
        success: false,
        message: 'User already blocked'
      });
    }

    user.blockedUsers.push(req.params.userId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User blocked successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Unblock user
// @route   DELETE /api/users/block/user/:userId
// @access  Private
const unblockUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    user.blockedUsers = user.blockedUsers.filter(
      id => id.toString() !== req.params.userId
    );
    
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User unblocked successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Block artisan
// @route   POST /api/users/block/artisan/:artisanId
// @access  Private
const blockArtisan = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user.blockedArtisans.includes(req.params.artisanId)) {
      return res.status(400).json({
        success: false,
        message: 'Artisan already blocked'
      });
    }

    user.blockedArtisans.push(req.params.artisanId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Artisan blocked successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Unblock artisan
// @route   DELETE /api/users/block/artisan/:artisanId
// @access  Private
const unblockArtisan = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    user.blockedArtisans = user.blockedArtisans.filter(
      id => id.toString() !== req.params.artisanId
    );
    
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Artisan unblocked successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get blocked users
// @route   GET /api/users/blocked/users
// @access  Private
const getBlockedUsers = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('blockedUsers');
    
    res.status(200).json({
      success: true,
      data: user.blockedUsers
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get blocked artisans
// @route   GET /api/users/blocked/artisans
// @access  Private
const getBlockedArtisans = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('blockedArtisans');
    
    res.status(200).json({
      success: true,
      data: user.blockedArtisans
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user preferences
// @route   PUT /api/users/preferences
// @access  Private
const updatePreferences = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { preferences: req.body },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateProfile,
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavoriteStatus,
  shareArtisan,
  blockUser,
  unblockUser,
  blockArtisan,
  unblockArtisan,
  getBlockedUsers,
  getBlockedArtisans,
  updatePreferences
}; 