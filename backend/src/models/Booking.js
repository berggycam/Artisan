const mongoose = require('mongoose');

const bookingStatusSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String,
    maxlength: [200, 'Message cannot be more than 200 characters']
  }
}, { timestamps: true });

const locationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: [true, 'Please add latitude']
  },
  longitude: {
    type: Number,
    required: [true, 'Please add longitude']
  },
  address: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  }
});

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please add user ID']
  },
  artisanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artisan',
    required: [true, 'Please add artisan ID']
  },
  serviceId: {
    type: String,
    required: [true, 'Please add service ID']
  },
  serviceName: {
    type: String,
    required: [true, 'Please add service name']
  },
  artisanName: {
    type: String,
    required: [true, 'Please add artisan name']
  },
  artisanAvatar: {
    type: String,
    default: null
  },
  artisanLocation: {
    type: locationSchema,
    required: [true, 'Please add artisan location']
  },
  userLocation: {
    type: locationSchema,
    required: [true, 'Please add user location']
  },
  scheduledDate: {
    type: Date,
    required: [true, 'Please add scheduled date']
  },
  scheduledTime: {
    type: String,
    required: [true, 'Please add scheduled time'],
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please add a valid time format (HH:MM)']
  },
  duration: {
    type: Number,
    required: [true, 'Please add duration in minutes'],
    min: [15, 'Duration must be at least 15 minutes']
  },
  price: {
    type: Number,
    required: [true, 'Please add price'],
    min: [0, 'Price cannot be negative']
  },
  status: [bookingStatusSchema],
  currentStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  specialRequests: {
    type: String,
    maxlength: [500, 'Special requests cannot be more than 500 characters']
  },
  estimatedArrival: {
    type: Date,
    default: null
  },
  actualStartTime: {
    type: Date,
    default: null
  },
  actualEndTime: {
    type: Date,
    default: null
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5'],
    default: null
  },
  review: {
    type: String,
    maxlength: [500, 'Review cannot be more than 500 characters'],
    default: null
  },
  cancellationReason: {
    type: String,
    maxlength: [200, 'Cancellation reason cannot be more than 200 characters'],
    default: null
  },
  cancelledBy: {
    type: String,
    enum: ['user', 'artisan', 'system'],
    default: null
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'mobile_money', 'bank_transfer'],
    default: 'cash'
  },
  paymentTiming: {
    type: String,
    enum: ['before_delivery', 'after_delivery'],
    default: 'after_delivery'
  },
  paymentId: {
    type: String,
    default: null
  },
  commission: {
    type: Number,
    default: 0,
    min: [0, 'Commission cannot be negative']
  },
  artisanEarnings: {
    type: Number,
    default: 0,
    min: [0, 'Earnings cannot be negative']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for booking duration in hours
bookingSchema.virtual('durationHours').get(function() {
  return this.duration / 60;
});

// Virtual for total amount (price + any additional fees)
bookingSchema.virtual('totalAmount').get(function() {
  return this.price;
});

// Virtual for isOverdue
bookingSchema.virtual('isOverdue').get(function() {
  if (this.currentStatus === 'confirmed' || this.currentStatus === 'in_progress') {
    const scheduledDateTime = new Date(this.scheduledDate);
    scheduledDateTime.setHours(
      parseInt(this.scheduledTime.split(':')[0]),
      parseInt(this.scheduledTime.split(':')[1]),
      0,
      0
    );
    return new Date() > scheduledDateTime;
  }
  return false;
});

// Virtual for isUpcoming
bookingSchema.virtual('isUpcoming').get(function() {
  if (this.currentStatus === 'confirmed') {
    const scheduledDateTime = new Date(this.scheduledDate);
    scheduledDateTime.setHours(
      parseInt(this.scheduledTime.split(':')[0]),
      parseInt(this.scheduledTime.split(':')[1]),
      0,
      0
    );
    const now = new Date();
    const diffInHours = (scheduledDateTime - now) / (1000 * 60 * 60);
    return diffInHours > 0 && diffInHours <= 24; // Within next 24 hours
  }
  return false;
});

// Indexes
bookingSchema.index({ userId: 1, createdAt: -1 });
bookingSchema.index({ artisanId: 1, createdAt: -1 });
bookingSchema.index({ currentStatus: 1 });
bookingSchema.index({ scheduledDate: 1 });
bookingSchema.index({ 'artisanLocation': '2dsphere' });
bookingSchema.index({ 'userLocation': '2dsphere' });
bookingSchema.index({ paymentStatus: 1 });

// Pre-save middleware to update current status
bookingSchema.pre('save', function(next) {
  if (this.status && this.status.length > 0) {
    this.currentStatus = this.status[this.status.length - 1].status;
  }
  next();
});

// Pre-save middleware to calculate earnings
bookingSchema.pre('save', function(next) {
  if (this.currentStatus === 'completed' && this.price > 0) {
    // Calculate commission (example: 10% platform fee)
    this.commission = this.price * 0.1;
    this.artisanEarnings = this.price - this.commission;
  }
  next();
});

// Method to add status update
bookingSchema.methods.addStatus = function(status, message = '') {
  this.status.push({
    status,
    message,
    timestamp: new Date()
  });
  this.currentStatus = status;
  return this.save();
};

// Method to calculate estimated arrival
bookingSchema.methods.calculateETA = function(artisanCurrentLocation) {
  if (!artisanCurrentLocation || !this.userLocation) {
    return null;
  }

  // Simple distance calculation (you might want to use a more sophisticated algorithm)
  const R = 6371; // Earth's radius in km
  const dLat = (artisanCurrentLocation.latitude - this.userLocation.latitude) * Math.PI / 180;
  const dLon = (artisanCurrentLocation.longitude - this.userLocation.longitude) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.userLocation.latitude * Math.PI / 180) * Math.cos(artisanCurrentLocation.latitude * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in km

  // Assume average speed of 30 km/h in urban areas
  const estimatedMinutes = Math.round(distance * 2); // 2 minutes per km
  
  return estimatedMinutes;
};

// Method to check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function() {
  const now = new Date();
  const scheduledDateTime = new Date(this.scheduledDate);
  scheduledDateTime.setHours(
    parseInt(this.scheduledTime.split(':')[0]),
    parseInt(this.scheduledTime.split(':')[1]),
    0,
    0
  );
  
  // Can cancel if more than 2 hours before scheduled time
  const hoursUntilBooking = (scheduledDateTime - now) / (1000 * 60 * 60);
  return this.currentStatus === 'pending' || this.currentStatus === 'confirmed' && hoursUntilBooking > 2;
};

// Static method to get bookings by date range
bookingSchema.statics.getByDateRange = function(startDate, endDate, userId = null, artisanId = null) {
  const query = {
    scheduledDate: {
      $gte: startDate,
      $lte: endDate
    }
  };

  if (userId) query.userId = userId;
  if (artisanId) query.artisanId = artisanId;

  return this.find(query).populate('userId', 'name email phone').populate('artisanId', 'name email phone');
};

// Static method to get nearby bookings
bookingSchema.statics.getNearby = function(location, radius = 10) {
  return this.find({
    'userLocation': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [location.longitude, location.latitude]
        },
        $maxDistance: radius * 1000 // Convert km to meters
      }
    }
  });
};

module.exports = mongoose.model('Booking', bookingSchema); 