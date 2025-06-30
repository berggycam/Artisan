const Artisan = require('../models/Artisan');
const Booking = require('../models/Booking');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all artisans with filters
// @route   GET /api/artisans
// @access  Public
const getArtisans = asyncHandler(async (req, res, next) => {
  const {
    serviceType,
    rating,
    radius,
    minPrice,
    maxPrice,
    isOnline,
    isVerified,
    lat,
    lng,
    page = 1,
    limit = 10
  } = req.query;

  // Build query
  let query = Artisan.find({ isBlocked: false });

  // Filter by service type
  if (serviceType) {
    query = query.where('services.category', new RegExp(serviceType, 'i'));
  }

  // Filter by rating
  if (rating) {
    query = query.where('rating').gte(parseFloat(rating));
  }

  // Filter by price range
  if (minPrice || maxPrice) {
    const priceFilter = {};
    if (minPrice) priceFilter.$gte = parseFloat(minPrice);
    if (maxPrice) priceFilter.$lte = parseFloat(maxPrice);
    query = query.where('services.price', priceFilter);
  }

  // Filter by online status
  if (isOnline !== undefined) {
    query = query.where('isOnline', isOnline === 'true');
  }

  // Filter by verification status
  if (isVerified !== undefined) {
    query = query.where('isVerified', isVerified === 'true');
  }

  // Filter by location (if coordinates provided)
  if (lat && lng && radius) {
    query = query.where('location').near({
      center: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)]
      },
      maxDistance: parseFloat(radius) * 1000, // Convert km to meters
      spherical: true
    });
  }

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  query = query.skip(skip).limit(parseInt(limit));

  // Populate reviews and select fields
  query = query.select('name avatar bio location rating totalReviews experience isOnline isVerified services');

  const artisans = await query;

  res.status(200).json({
    success: true,
    count: artisans.length,
    data: artisans
  });
});

// @desc    Get single artisan
// @route   GET /api/artisans/:id
// @access  Public
const getArtisan = asyncHandler(async (req, res, next) => {
  const artisan = await Artisan.findById(req.params.id)
    .select('-password -verificationToken -resetPasswordToken -resetPasswordExpire')
    .populate('reviews.userId', 'name avatar');

  if (!artisan) {
    return next(new ErrorResponse(`Artisan not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: artisan
  });
});

// @desc    Update artisan
// @route   PUT /api/artisans/:id
// @access  Private (Admin)
const updateArtisan = asyncHandler(async (req, res, next) => {
  let artisan = await Artisan.findById(req.params.id);

  if (!artisan) {
    return next(new ErrorResponse(`Artisan not found with id of ${req.params.id}`, 404));
  }

  artisan = await Artisan.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: artisan
  });
});

// @desc    Delete artisan
// @route   DELETE /api/artisans/:id
// @access  Private (Admin)
const deleteArtisan = asyncHandler(async (req, res, next) => {
  const artisan = await Artisan.findById(req.params.id);

  if (!artisan) {
    return next(new ErrorResponse(`Artisan not found with id of ${req.params.id}`, 404));
  }

  await artisan.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get artisan profile
// @route   GET /api/artisans/profile/me
// @access  Private (Artisan)
const getProfile = asyncHandler(async (req, res, next) => {
  const artisan = await Artisan.findById(req.artisan.id)
    .select('-password -verificationToken -resetPasswordToken -resetPasswordExpire');

  res.status(200).json({
    success: true,
    data: artisan
  });
});

// @desc    Update artisan profile
// @route   PUT /api/artisans/profile/me
// @access  Private (Artisan)
const updateProfile = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    bio: req.body.bio,
    experience: req.body.experience,
    location: req.body.location,
    certifications: req.body.certifications,
    languages: req.body.languages
  };

  const artisan = await Artisan.findByIdAndUpdate(req.artisan.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: artisan
  });
});

// @desc    Update artisan location
// @route   PUT /api/artisans/location
// @access  Private (Artisan)
const updateLocation = asyncHandler(async (req, res, next) => {
  const { latitude, longitude } = req.body;

  const artisan = await Artisan.findByIdAndUpdate(
    req.artisan.id,
    {
      currentLocation: {
        latitude,
        longitude,
        lastUpdated: new Date()
      },
      lastSeen: new Date()
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: artisan
  });
});

// @desc    Update artisan services
// @route   PUT /api/artisans/services
// @access  Private (Artisan)
const updateServices = asyncHandler(async (req, res, next) => {
  const artisan = await Artisan.findByIdAndUpdate(
    req.artisan.id,
    { services: req.body.services },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: artisan
  });
});

// @desc    Add service
// @route   POST /api/artisans/services
// @access  Private (Artisan)
const addService = asyncHandler(async (req, res, next) => {
  const artisan = await Artisan.findById(req.artisan.id);

  artisan.services.push(req.body);
  await artisan.save();

  res.status(201).json({
    success: true,
    data: artisan
  });
});

// @desc    Update service
// @route   PUT /api/artisans/services/:serviceId
// @access  Private (Artisan)
const updateService = asyncHandler(async (req, res, next) => {
  const artisan = await Artisan.findById(req.artisan.id);

  const serviceIndex = artisan.services.findIndex(
    service => service._id.toString() === req.params.serviceId
  );

  if (serviceIndex === -1) {
    return next(new ErrorResponse('Service not found', 404));
  }

  artisan.services[serviceIndex] = { ...artisan.services[serviceIndex].toObject(), ...req.body };
  await artisan.save();

  res.status(200).json({
    success: true,
    data: artisan
  });
});

// @desc    Delete service
// @route   DELETE /api/artisans/services/:serviceId
// @access  Private (Artisan)
const deleteService = asyncHandler(async (req, res, next) => {
  const artisan = await Artisan.findById(req.artisan.id);

  artisan.services = artisan.services.filter(
    service => service._id.toString() !== req.params.serviceId
  );

  await artisan.save();

  res.status(200).json({
    success: true,
    data: artisan
  });
});

// @desc    Add portfolio item
// @route   POST /api/artisans/portfolio
// @access  Private (Artisan)
const addPortfolio = asyncHandler(async (req, res, next) => {
  const artisan = await Artisan.findById(req.artisan.id);

  artisan.portfolio.push(req.body);
  await artisan.save();

  res.status(201).json({
    success: true,
    data: artisan
  });
});

// @desc    Update portfolio item
// @route   PUT /api/artisans/portfolio/:portfolioId
// @access  Private (Artisan)
const updatePortfolio = asyncHandler(async (req, res, next) => {
  const artisan = await Artisan.findById(req.artisan.id);

  const portfolioIndex = artisan.portfolio.findIndex(
    item => item._id.toString() === req.params.portfolioId
  );

  if (portfolioIndex === -1) {
    return next(new ErrorResponse('Portfolio item not found', 404));
  }

  artisan.portfolio[portfolioIndex] = { ...artisan.portfolio[portfolioIndex].toObject(), ...req.body };
  await artisan.save();

  res.status(200).json({
    success: true,
    data: artisan
  });
});

// @desc    Delete portfolio item
// @route   DELETE /api/artisans/portfolio/:portfolioId
// @access  Private (Artisan)
const deletePortfolio = asyncHandler(async (req, res, next) => {
  const artisan = await Artisan.findById(req.artisan.id);

  artisan.portfolio = artisan.portfolio.filter(
    item => item._id.toString() !== req.params.portfolioId
  );

  await artisan.save();

  res.status(200).json({
    success: true,
    data: artisan
  });
});

// @desc    Update availability
// @route   PUT /api/artisans/availability
// @access  Private (Artisan)
const updateAvailability = asyncHandler(async (req, res, next) => {
  const artisan = await Artisan.findByIdAndUpdate(
    req.artisan.id,
    { availability: req.body.availability },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: artisan
  });
});

// @desc    Get artisan reviews
// @route   GET /api/artisans/:id/reviews
// @access  Public
const getReviews = asyncHandler(async (req, res, next) => {
  const artisan = await Artisan.findById(req.params.id)
    .populate('reviews.userId', 'name avatar');

  if (!artisan) {
    return next(new ErrorResponse(`Artisan not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    count: artisan.reviews.length,
    data: artisan.reviews
  });
});

// @desc    Add review
// @route   POST /api/artisans/reviews
// @access  Private (User)
const addReview = asyncHandler(async (req, res, next) => {
  req.body.userId = req.user.id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  const artisan = await Artisan.findById(req.body.artisanId);

  if (!artisan) {
    return next(new ErrorResponse(`Artisan not found with id of ${req.body.artisanId}`, 404));
  }

  artisan.reviews.push(req.body);
  await artisan.calculateRating();
  await artisan.save();

  res.status(201).json({
    success: true,
    data: artisan
  });
});

// @desc    Update review
// @route   PUT /api/artisans/reviews/:reviewId
// @access  Private (User)
const updateReview = asyncHandler(async (req, res, next) => {
  const artisan = await Artisan.findById(req.artisan.id);

  const reviewIndex = artisan.reviews.findIndex(
    review => review._id.toString() === req.params.reviewId
  );

  if (reviewIndex === -1) {
    return next(new ErrorResponse('Review not found', 404));
  }

  // Check if user owns the review
  if (artisan.reviews[reviewIndex].userId.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized to update this review', 401));
  }

  artisan.reviews[reviewIndex] = { ...artisan.reviews[reviewIndex].toObject(), ...req.body };
  await artisan.calculateRating();
  await artisan.save();

  res.status(200).json({
    success: true,
    data: artisan
  });
});

// @desc    Delete review
// @route   DELETE /api/artisans/reviews/:reviewId
// @access  Private (User)
const deleteReview = asyncHandler(async (req, res, next) => {
  const artisan = await Artisan.findById(req.artisan.id);

  const reviewIndex = artisan.reviews.findIndex(
    review => review._id.toString() === req.params.reviewId
  );

  if (reviewIndex === -1) {
    return next(new ErrorResponse('Review not found', 404));
  }

  // Check if user owns the review
  if (artisan.reviews[reviewIndex].userId.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized to delete this review', 401));
  }

  artisan.reviews.splice(reviewIndex, 1);
  await artisan.calculateRating();
  await artisan.save();

  res.status(200).json({
    success: true,
    data: artisan
  });
});

// @desc    Get artisan earnings
// @route   GET /api/artisans/earnings
// @access  Private (Artisan)
const getEarnings = asyncHandler(async (req, res, next) => {
  const { startDate, endDate } = req.query;

  let query = { artisanId: req.artisan.id, currentStatus: 'completed' };

  if (startDate && endDate) {
    query.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const bookings = await Booking.find(query);

  const totalEarnings = bookings.reduce((sum, booking) => sum + booking.price, 0);

  res.status(200).json({
    success: true,
    data: {
      totalEarnings,
      totalBookings: bookings.length,
      bookings
    }
  });
});

// @desc    Get artisan analytics
// @route   GET /api/artisans/analytics
// @access  Private (Artisan)
const getAnalytics = asyncHandler(async (req, res, next) => {
  const { period = '30' } = req.query;

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - parseInt(period));

  const bookings = await Booking.find({
    artisanId: req.artisan.id,
    createdAt: { $gte: startDate }
  });

  const analytics = {
    totalBookings: bookings.length,
    completedBookings: bookings.filter(b => b.currentStatus === 'completed').length,
    pendingBookings: bookings.filter(b => b.currentStatus === 'pending').length,
    totalEarnings: bookings
      .filter(b => b.currentStatus === 'completed')
      .reduce((sum, b) => sum + b.price, 0),
    averageRating: req.artisan.rating,
    totalReviews: req.artisan.totalReviews
  };

  res.status(200).json({
    success: true,
    data: analytics
  });
});

// @desc    Block user
// @route   POST /api/artisans/block/user/:userId
// @access  Private (Artisan)
const blockUser = asyncHandler(async (req, res, next) => {
  const artisan = await Artisan.findById(req.artisan.id);

  if (artisan.blockedUsers.includes(req.params.userId)) {
    return next(new ErrorResponse('User is already blocked', 400));
  }

  artisan.blockedUsers.push(req.params.userId);
  await artisan.save();

  res.status(200).json({
    success: true,
    data: artisan
  });
});

// @desc    Unblock user
// @route   DELETE /api/artisans/block/user/:userId
// @access  Private (Artisan)
const unblockUser = asyncHandler(async (req, res, next) => {
  const artisan = await Artisan.findById(req.artisan.id);

  artisan.blockedUsers = artisan.blockedUsers.filter(
    userId => userId.toString() !== req.params.userId
  );

  await artisan.save();

  res.status(200).json({
    success: true,
    data: artisan
  });
});

// @desc    Get blocked users
// @route   GET /api/artisans/blocked/users
// @access  Private (Artisan)
const getBlockedUsers = asyncHandler(async (req, res, next) => {
  const artisan = await Artisan.findById(req.artisan.id)
    .populate('blockedUsers', 'name avatar');

  res.status(200).json({
    success: true,
    data: artisan.blockedUsers
  });
});

// @desc    Update preferences
// @route   PUT /api/artisans/preferences
// @access  Private (Artisan)
const updatePreferences = asyncHandler(async (req, res, next) => {
  const artisan = await Artisan.findByIdAndUpdate(
    req.artisan.id,
    { preferences: req.body.preferences },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: artisan
  });
});

module.exports = {
  getArtisans,
  getArtisan,
  updateArtisan,
  deleteArtisan,
  getProfile,
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
}; 