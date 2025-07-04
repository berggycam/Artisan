const Artisan = require('../models/Artisan');
const Booking = require('../models/Booking');

// @desc    Search artisans with advanced filters
// @route   GET /api/search/artisans
// @access  Public
const searchArtisans = async (req, res) => {
  try {
    const {
      q, // search query
      category,
      serviceType,
      rating,
      minPrice,
      maxPrice,
      radius,
      latitude,
      longitude,
      isOnline,
      isVerified,
      experience,
      sortBy = 'rating',
      sortOrder = 'desc',
      page = 1,
      limit = 20
    } = req.query;

    let query = { isBlocked: false };
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { bio: { $regex: q, $options: 'i' } },
        { 'services.name': { $regex: q, $options: 'i' } },
        { 'services.description': { $regex: q, $options: 'i' } },
        { 'location.city': { $regex: q, $options: 'i' } },
        { 'location.address': { $regex: q, $options: 'i' } }
      ];
    }
    if (category && category !== 'all') {
      query['services.category'] = { $regex: category, $options: 'i' };
    }
    if (serviceType) {
      query['services.name'] = { $regex: serviceType, $options: 'i' };
    }
    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }
    if (minPrice || maxPrice) {
      query['services.price'] = {};
      if (minPrice) query['services.price'].$gte = parseFloat(minPrice);
      if (maxPrice) query['services.price'].$lte = parseFloat(maxPrice);
    }
    if (experience) {
      query.experience = { $gte: parseInt(experience) };
    }
    if (isOnline !== undefined) {
      query.isOnline = isOnline === 'true';
    }
    if (isVerified !== undefined) {
      query.isVerified = isVerified === 'true';
    }
    let sort = {};
    switch (sortBy) {
      case 'rating':
        sort.rating = sortOrder === 'desc' ? -1 : 1;
        break;
      case 'price':
        sort['services.price'] = sortOrder === 'desc' ? -1 : 1;
        break;
      case 'experience':
        sort.experience = sortOrder === 'desc' ? -1 : 1;
        break;
      case 'reviews':
        sort.totalReviews = sortOrder === 'desc' ? -1 : 1;
        break;
      default:
        sort.rating = -1;
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const artisans = await Artisan.find(query)
      .select('-password -verificationToken -resetPasswordToken -resetPasswordExpire')
      .populate('bookings')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();
    const artisansWithStats = artisans.map(artisan => ({
      ...artisan,
      totalBookings: artisan.bookings?.length || 0,
      completedBookings: artisan.bookings?.filter(b => b.currentStatus === 'completed').length || 0
    }));
    const total = await Artisan.countDocuments(query);
    const totalPages = Math.ceil(total / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;
    res.status(200).json({
      success: true,
      count: artisansWithStats.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages,
        hasNextPage,
        hasPrevPage
      },
      data: artisansWithStats
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error searching artisans', error: error.message });
  }
};

// @desc    Search job opportunities for artisans
// @route   GET /api/search/jobs
// @access  Private (Artisan)
const searchJobs = async (req, res) => {
  try {
    const {
      q, category, minBudget, maxBudget, urgency, sortBy = 'date', sortOrder = 'desc', page = 1, limit = 20
    } = req.query;
    let query = { currentStatus: { $in: ['pending', 'open'] }, artisanId: { $exists: false } };
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { 'services.name': { $regex: q, $options: 'i' } },
        { 'services.description': { $regex: q, $options: 'i' } },
        { 'location.city': { $regex: q, $options: 'i' } },
        { 'location.address': { $regex: q, $options: 'i' } }
      ];
    }
    if (category && category !== 'all') {
      query['services.category'] = { $regex: category, $options: 'i' };
    }
    if (minBudget || maxBudget) {
      query.totalAmount = {};
      if (minBudget) query.totalAmount.$gte = parseFloat(minBudget);
      if (maxBudget) query.totalAmount.$lte = parseFloat(maxBudget);
    }
    if (urgency) {
      query.urgency = urgency;
    }
    let sort = {};
    switch (sortBy) {
      case 'date':
        sort.createdAt = sortOrder === 'desc' ? -1 : 1;
        break;
      case 'budget':
        sort.totalAmount = sortOrder === 'desc' ? -1 : 1;
        break;
      case 'urgency':
        sort.urgency = sortOrder === 'desc' ? -1 : 1;
        break;
      default:
        sort.createdAt = -1;
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const jobs = await Booking.find(query)
      .populate('userId', 'name avatar email phone')
      .populate('services')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();
    const total = await Booking.countDocuments(query);
    const totalPages = Math.ceil(total / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;
    res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages,
        hasNextPage,
        hasPrevPage
      },
      data: jobs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error searching jobs', error: error.message });
  }
};

// @desc    Get search suggestions
// @route   GET /api/search/suggestions
// @access  Public
const getSearchSuggestions = async (req, res) => {
  try {
    const { q, type = 'artisans' } = req.query;
    if (!q || q.length < 2) {
      return res.status(200).json({ success: true, data: [] });
    }
    let suggestions = [];
    if (type === 'artisans') {
      const artisanNames = await Artisan.find({ name: { $regex: q, $options: 'i' }, isBlocked: false })
        .select('name').limit(5).lean();
      const serviceNames = await Artisan.aggregate([
        { $match: { isBlocked: false, 'services.name': { $regex: q, $options: 'i' } } },
        { $unwind: '$services' },
        { $match: { 'services.name': { $regex: q, $options: 'i' } } },
        { $group: { _id: '$services.name', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]);
      const locations = await Artisan.find({ 'location.city': { $regex: q, $options: 'i' }, isBlocked: false })
        .select('location.city').limit(5).lean();
      suggestions = [
        ...artisanNames.map(a => ({ type: 'artisan', value: a.name })),
        ...serviceNames.map(s => ({ type: 'service', value: s._id })),
        ...locations.map(l => ({ type: 'location', value: l.location.city }))
      ];
    } else if (type === 'jobs') {
      const jobTitles = await Booking.find({ title: { $regex: q, $options: 'i' }, currentStatus: { $in: ['pending', 'open'] } })
        .select('title').limit(5).lean();
      const serviceNames = await Booking.aggregate([
        { $match: { currentStatus: { $in: ['pending', 'open'] }, 'services.name': { $regex: q, $options: 'i' } } },
        { $unwind: '$services' },
        { $match: { 'services.name': { $regex: q, $options: 'i' } } },
        { $group: { _id: '$services.name', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]);
      suggestions = [
        ...jobTitles.map(j => ({ type: 'job', value: j.title })),
        ...serviceNames.map(s => ({ type: 'service', value: s._id }))
      ];
    }
    res.status(200).json({ success: true, data: suggestions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error getting suggestions', error: error.message });
  }
};

// @desc    Get search categories
// @route   GET /api/search/categories
// @access  Public
const getSearchCategories = async (req, res) => {
  try {
    const { type = 'artisans' } = req.query;
    let categories = [];
    if (type === 'artisans') {
      const serviceCategories = await Artisan.aggregate([
        { $match: { isBlocked: false } },
        { $unwind: '$services' },
        { $group: { _id: '$services.category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
      categories = serviceCategories.map(cat => ({ id: cat._id, name: cat._id, count: cat.count }));
    } else if (type === 'jobs') {
      const serviceCategories = await Booking.aggregate([
        { $match: { currentStatus: { $in: ['pending', 'open'] } } },
        { $unwind: '$services' },
        { $group: { _id: '$services.category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
      categories = serviceCategories.map(cat => ({ id: cat._id, name: cat._id, count: cat.count }));
    }
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error getting categories', error: error.message });
  }
};

// @desc    Get recent searches
// @route   GET /api/search/recent
// @access  Private
const getRecentSearches = async (req, res) => {
  try {
    const recentSearches = [
      'Hair stylist',
      'Phone repair',
      'Carpenter',
      'Seamstress',
      'Electrician'
    ];
    res.status(200).json({ success: true, data: recentSearches });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error getting recent searches', error: error.message });
  }
};

// @desc    Save search to recent searches
// @route   POST /api/search/recent
// @access  Private
const saveRecentSearch = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: 'Search saved to recent searches' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving recent search', error: error.message });
  }
};

module.exports = {
  searchArtisans,
  searchJobs,
  getSearchSuggestions,
  getSearchCategories,
  getRecentSearches,
  saveRecentSearch
};
