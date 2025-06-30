const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const artisanServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a service name'],
    trim: true,
    maxlength: [100, 'Service name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a service description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  duration: {
    type: Number,
    required: [true, 'Please add duration in minutes'],
    min: [15, 'Duration must be at least 15 minutes']
  },
  category: {
    type: String,
    required: [true, 'Please add a category']
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const artisanReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userAvatar: {
    type: String,
    default: null
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  comment: {
    type: String,
    required: [true, 'Please add a comment'],
    maxlength: [500, 'Comment cannot be more than 500 characters']
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  }
}, { timestamps: true });

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  images: [{
    type: String,
    required: [true, 'Please add at least one image']
  }],
  category: {
    type: String,
    required: [true, 'Please add a category']
  }
}, { timestamps: true });

const availabilitySchema = new mongoose.Schema({
  start: {
    type: String,
    required: [true, 'Please add start time'],
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please add a valid time format (HH:MM)']
  },
  end: {
    type: String,
    required: [true, 'Please add end time'],
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please add a valid time format (HH:MM)']
  },
  available: {
    type: Boolean,
    default: true
  }
});

const artisanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    unique: true,
    match: [
      /^[\+]?[1-9][\d]{0,15}$/,
      'Please add a valid phone number'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  avatar: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters'],
    default: ''
  },
  location: {
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
  },
  currentLocation: {
    latitude: {
      type: Number,
      default: null
    },
    longitude: {
      type: Number,
      default: null
    },
    lastUpdated: {
      type: Date,
      default: null
    }
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  lastSeen: {
    type: Date,
    default: Date.now
  },
  services: [artisanServiceSchema],
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot be more than 5']
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  reviews: [artisanReviewSchema],
  experience: {
    type: Number,
    required: [true, 'Please add years of experience'],
    min: [0, 'Experience cannot be negative']
  },
  certifications: [{
    type: String,
    trim: true
  }],
  languages: [{
    type: String,
    trim: true
  }],
  availability: {
    monday: availabilitySchema,
    tuesday: availabilitySchema,
    wednesday: availabilitySchema,
    thursday: availabilitySchema,
    friday: availabilitySchema,
    saturday: availabilitySchema,
    sunday: availabilitySchema
  },
  portfolio: [portfolioSchema],
  isVerified: {
    type: Boolean,
    default: false
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
    default: null
  },
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpire: {
    type: Date,
    default: null
  },
  preferences: {
    notifications: {
      push: { type: Boolean, default: true },
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false }
    },
    language: {
      type: String,
      default: 'en'
    },
    currency: {
      type: String,
      default: 'USD'
    },
    autoAcceptBookings: {
      type: Boolean,
      default: false
    },
    maxDistance: {
      type: Number,
      default: 50, // km
      min: [1, 'Max distance must be at least 1 km'],
      max: [200, 'Max distance cannot be more than 200 km']
    }
  },
  blockedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for artisan's bookings
artisanSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'artisanId',
  justOne: false
});

// Virtual for artisan's earnings
artisanSchema.virtual('earnings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'artisanId',
  justOne: false,
  match: { currentStatus: 'completed' }
});

// Index for geospatial queries
artisanSchema.index({ 'location': '2dsphere' });
artisanSchema.index({ 'currentLocation': '2dsphere' });

// Index for email and phone lookups
artisanSchema.index({ email: 1 });
artisanSchema.index({ phone: 1 });

// Index for search functionality
artisanSchema.index({ 
  name: 'text', 
  bio: 'text', 
  'services.name': 'text',
  'services.description': 'text'
});

// Encrypt password using bcrypt
artisanSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Update rating when reviews change
artisanSchema.pre('save', function(next) {
  if (this.reviews && this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating = totalRating / this.reviews.length;
    this.totalReviews = this.reviews.length;
  }
  next();
});

// Sign JWT and return
artisanSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Match artisan entered password to hashed password in database
artisanSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
artisanSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// Method to update current location
artisanSchema.methods.updateLocation = function(latitude, longitude) {
  this.currentLocation = {
    latitude,
    longitude,
    lastUpdated: new Date()
  };
  this.lastSeen = new Date();
  return this.save();
};

// Method to calculate average rating
artisanSchema.methods.calculateRating = function() {
  if (this.reviews.length === 0) {
    this.rating = 0;
    this.totalReviews = 0;
  } else {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating = totalRating / this.reviews.length;
    this.totalReviews = this.reviews.length;
  }
  return this.save();
};

module.exports = mongoose.model('Artisan', artisanSchema); 