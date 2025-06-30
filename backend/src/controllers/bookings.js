const Booking = require('../models/Booking');
const User = require('../models/User');
const Artisan = require('../models/Artisan');
const { validationResult } = require('express-validator');

// @desc    Get all bookings for user/artisan
// @route   GET /api/bookings
// @access  Private
const getBookings = async (req, res) => {
  try {
    const { status, startDate, endDate, serviceType, page = 1, limit = 10 } = req.query;
    const userId = req.user.id;
    const isArtisan = req.user.role === 'artisan';

    const query = {};
    
    if (isArtisan) {
      query.artisanId = userId;
    } else {
      query.userId = userId;
    }

    if (status) {
      query.currentStatus = status;
    }

    if (startDate && endDate) {
      query.scheduledDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    if (serviceType) {
      query.serviceName = { $regex: serviceType, $options: 'i' };
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: [
        { path: 'userId', select: 'name email phone avatar' },
        { path: 'artisanId', select: 'name email phone avatar rating' }
      ]
    };

    const bookings = await Booking.paginate(query, options);

    res.json({
      success: true,
      data: bookings.docs,
      pagination: {
        page: bookings.page,
        limit: bookings.limit,
        totalPages: bookings.totalPages,
        totalDocs: bookings.totalDocs
      }
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings'
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('userId', 'name email phone avatar')
      .populate('artisanId', 'name email phone avatar rating services');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user has access to this booking
    const userId = req.user.id;
    const isArtisan = req.user.role === 'artisan';
    
    if (isArtisan && booking.artisanId._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this booking'
      });
    }

    if (!isArtisan && booking.userId._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this booking'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching booking'
    });
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const {
      artisanId,
      serviceId,
      serviceName,
      scheduledDate,
      scheduledTime,
      duration,
      price,
      userLocation,
      description,
      specialRequests,
      paymentTiming, // 'before_delivery' or 'after_delivery'
      paymentMethod
    } = req.body;

    const userId = req.user.id;

    // Verify artisan exists and is available
    const artisan = await Artisan.findById(artisanId);
    if (!artisan) {
      return res.status(404).json({
        success: false,
        message: 'Artisan not found'
      });
    }

    if (!artisan.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Artisan is currently unavailable'
      });
    }

    // Check for booking conflicts
    const conflictingBooking = await Booking.findOne({
      artisanId,
      scheduledDate,
      currentStatus: { $in: ['pending', 'confirmed', 'in_progress'] },
      $or: [
        {
          scheduledTime: {
            $gte: scheduledTime,
            $lt: new Date(new Date(`2000-01-01T${scheduledTime}`).getTime() + duration * 60000).toTimeString().slice(0, 5)
          }
        },
        {
          scheduledTime: {
            $lt: new Date(new Date(`2000-01-01T${scheduledTime}`).getTime() + duration * 60000).toTimeString().slice(0, 5),
            $gte: new Date(new Date(`2000-01-01T${scheduledTime}`).getTime() - duration * 60000).toTimeString().slice(0, 5)
          }
        }
      ]
    });

    if (conflictingBooking) {
      return res.status(400).json({
        success: false,
        message: 'Artisan has a conflicting booking at this time'
      });
    }

    // Create booking
    const booking = new Booking({
      userId,
      artisanId,
      serviceId,
      serviceName,
      artisanName: artisan.name,
      artisanAvatar: artisan.avatar,
      artisanLocation: artisan.location,
      userLocation,
      scheduledDate,
      scheduledTime,
      duration,
      price,
      description,
      specialRequests,
      paymentTiming: paymentTiming || 'after_delivery', // Default to after delivery
      paymentMethod: paymentMethod || 'cash',
      paymentStatus: paymentTiming === 'before_delivery' ? 'pending' : 'pending',
      status: [{
        status: 'pending',
        message: 'Booking request sent',
        timestamp: new Date()
      }]
    });

    await booking.save();

    // Populate user and artisan details
    await booking.populate('userId', 'name email phone avatar');
    await booking.populate('artisanId', 'name email phone avatar rating');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating booking'
    });
  }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
const updateBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check authorization
    const userId = req.user.id;
    const isArtisan = req.user.role === 'artisan';
    
    if (isArtisan && booking.artisanId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }

    if (!isArtisan && booking.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }

    // Only allow updates for pending bookings
    if (booking.currentStatus !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update booking that is not pending'
      });
    }

    const allowedUpdates = ['scheduledDate', 'scheduledTime', 'description', 'specialRequests'];
    const updates = {};
    
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('userId', 'name email phone avatar')
     .populate('artisanId', 'name email phone avatar rating');

    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: updatedBooking
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating booking'
    });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Only user can delete their own booking
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this booking'
      });
    }

    // Only allow deletion of pending bookings
    if (booking.currentStatus !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete booking that is not pending'
      });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting booking'
    });
  }
};

// @desc    Confirm booking (artisan only)
// @route   PUT /api/bookings/:id/confirm
// @access  Private (Artisan)
const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Only artisan can confirm booking
    if (booking.artisanId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to confirm this booking'
      });
    }

    if (booking.currentStatus !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Booking is not in pending status'
      });
    }

    await booking.addStatus('confirmed', 'Booking confirmed by artisan');

    res.json({
      success: true,
      message: 'Booking confirmed successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error confirming booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while confirming booking'
    });
  }
};

// @desc    Start booking (artisan only)
// @route   PUT /api/bookings/:id/start
// @access  Private (Artisan)
const startBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Only artisan can start booking
    if (booking.artisanId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to start this booking'
      });
    }

    if (booking.currentStatus !== 'confirmed') {
      return res.status(400).json({
        success: false,
        message: 'Booking must be confirmed before starting'
      });
    }

    booking.actualStartTime = new Date();
    await booking.addStatus('in_progress', 'Work started');

    res.json({
      success: true,
      message: 'Booking started successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error starting booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while starting booking'
    });
  }
};

// @desc    Complete booking (artisan only)
// @route   PUT /api/bookings/:id/complete
// @access  Private (Artisan)
const completeBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Only artisan can complete booking
    if (booking.artisanId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to complete this booking'
      });
    }

    if (booking.currentStatus !== 'in_progress') {
      return res.status(400).json({
        success: false,
        message: 'Booking must be in progress before completing'
      });
    }

    booking.actualEndTime = new Date();
    
    // Handle payment based on payment timing
    if (booking.paymentTiming === 'after_delivery') {
      booking.paymentStatus = 'pending';
    }
    
    await booking.addStatus('completed', 'Work completed');

    res.json({
      success: true,
      message: 'Booking completed successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error completing booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while completing booking'
    });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const { reason } = req.body;
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    const userId = req.user.id;
    const isArtisan = req.user.role === 'artisan';
    
    // Check authorization
    if (isArtisan && booking.artisanId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    if (!isArtisan && booking.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    if (!booking.canBeCancelled()) {
      return res.status(400).json({
        success: false,
        message: 'Booking cannot be cancelled at this time'
      });
    }

    booking.cancellationReason = reason;
    booking.cancelledBy = isArtisan ? 'artisan' : 'user';
    
    // Handle payment refund if needed
    if (booking.paymentStatus === 'paid' && booking.paymentTiming === 'before_delivery') {
      booking.paymentStatus = 'refunded';
    }
    
    await booking.addStatus('cancelled', `Booking cancelled by ${isArtisan ? 'artisan' : 'user'}`);

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling booking'
    });
  }
};

// @desc    Add review to booking
// @route   POST /api/bookings/:id/review
// @access  Private
const addReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { rating, review } = req.body;
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Only user can add review
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add review to this booking'
      });
    }

    if (booking.currentStatus !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Can only review completed bookings'
      });
    }

    if (booking.rating) {
      return res.status(400).json({
        success: false,
        message: 'Review already exists for this booking'
      });
    }

    booking.rating = rating;
    booking.review = review;
    await booking.save();

    res.json({
      success: true,
      message: 'Review added successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding review'
    });
  }
};

// @desc    Update review
// @route   PUT /api/bookings/:id/review
// @access  Private
const updateReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { rating, review } = req.body;
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Only user can update review
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update review for this booking'
      });
    }

    if (!booking.rating) {
      return res.status(400).json({
        success: false,
        message: 'No review exists to update'
      });
    }

    booking.rating = rating;
    booking.review = review;
    await booking.save();

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating review'
    });
  }
};

// @desc    Delete review
// @route   DELETE /api/bookings/:id/review
// @access  Private
const deleteReview = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Only user can delete review
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete review for this booking'
      });
    }

    if (!booking.rating) {
      return res.status(400).json({
        success: false,
        message: 'No review exists to delete'
      });
    }

    booking.rating = null;
    booking.review = null;
    await booking.save();

    res.json({
      success: true,
      message: 'Review deleted successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting review'
    });
  }
};

// @desc    Get booking analytics
// @route   GET /api/bookings/analytics
// @access  Private
const getBookingAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;
    const isArtisan = req.user.role === 'artisan';
    const { startDate, endDate } = req.query;

    const query = {};
    if (isArtisan) {
      query.artisanId = userId;
    } else {
      query.userId = userId;
    }

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const analytics = await Booking.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$currentStatus',
          count: { $sum: 1 },
          totalAmount: { $sum: '$price' }
        }
      }
    ]);

    const totalBookings = await Booking.countDocuments(query);
    const totalEarnings = await Booking.aggregate([
      { $match: { ...query, currentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);

    res.json({
      success: true,
      data: {
        statusBreakdown: analytics,
        totalBookings,
        totalEarnings: totalEarnings[0]?.total || 0
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching analytics'
    });
  }
};

// @desc    Get upcoming bookings
// @route   GET /api/bookings/upcoming
// @access  Private
const getUpcomingBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const isArtisan = req.user.role === 'artisan';
    const now = new Date();

    const query = {
      scheduledDate: { $gte: now },
      currentStatus: { $in: ['pending', 'confirmed'] }
    };

    if (isArtisan) {
      query.artisanId = userId;
    } else {
      query.userId = userId;
    }

    const bookings = await Booking.find(query)
      .sort({ scheduledDate: 1, scheduledTime: 1 })
      .populate('userId', 'name email phone avatar')
      .populate('artisanId', 'name email phone avatar rating');

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching upcoming bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching upcoming bookings'
    });
  }
};

// @desc    Get past bookings
// @route   GET /api/bookings/past
// @access  Private
const getPastBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const isArtisan = req.user.role === 'artisan';
    const now = new Date();

    const query = {
      scheduledDate: { $lt: now },
      currentStatus: { $in: ['completed', 'cancelled'] }
    };

    if (isArtisan) {
      query.artisanId = userId;
    } else {
      query.userId = userId;
    }

    const bookings = await Booking.find(query)
      .sort({ scheduledDate: -1, scheduledTime: -1 })
      .populate('userId', 'name email phone avatar')
      .populate('artisanId', 'name email phone avatar rating');

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching past bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching past bookings'
    });
  }
};

// @desc    Get booking history
// @route   GET /api/bookings/history
// @access  Private
const getBookingHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const isArtisan = req.user.role === 'artisan';
    const { page = 1, limit = 20 } = req.query;

    const query = {};
    if (isArtisan) {
      query.artisanId = userId;
    } else {
      query.userId = userId;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: [
        { path: 'userId', select: 'name email phone avatar' },
        { path: 'artisanId', select: 'name email phone avatar rating' }
      ]
    };

    const history = await Booking.paginate(query, options);

    res.json({
      success: true,
      data: history.docs,
      pagination: {
        page: history.page,
        limit: history.limit,
        totalPages: history.totalPages,
        totalDocs: history.totalDocs
      }
    });
  } catch (error) {
    console.error('Error fetching booking history:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching booking history'
    });
  }
};

module.exports = {
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
}; 