# Artisan App Backend

A comprehensive Node.js backend API for the Artisan App, built with Express.js, MongoDB, and Socket.IO for real-time features.

## Features

- 🔐 **Authentication & Authorization**
  - JWT-based authentication
  - User and Artisan registration/login
  - Email verification
  - Password reset functionality
  - Role-based access control

- 👥 **User Management**
  - User profiles and preferences
  - Favorites management
  - User blocking system
  - Location-based services

- 🛠️ **Artisan Management**
  - Artisan profiles and portfolios
  - Service management
  - Availability scheduling
  - Review and rating system
  - Real-time location tracking

- 📅 **Booking System**
  - Booking creation and management
  - Status tracking (pending, confirmed, in-progress, completed, cancelled)
  - Payment integration
  - Review system

- 💬 **Real-time Features**
  - Live chat between users and artisans
  - Real-time location tracking
  - Push notifications
  - Booking status updates

- 📱 **File Upload**
  - Image upload to Cloudinary
  - Avatar management
  - Portfolio image management

- 📧 **Communication**
  - Email notifications
  - SMS notifications (Twilio)
  - Push notifications

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.IO
- **File Upload**: Multer + Cloudinary
- **Email**: Nodemailer
- **SMS**: Twilio
- **Validation**: Express-validator
- **Security**: Helmet, CORS, Rate limiting

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd artisan-app/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database
   MONGODB_URI=mongodb://localhost:27017/artisan-app

   # JWT
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d

   # Cloud Storage
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Email Service
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password

   # SMS Service (Twilio)
   TWILIO_ACCOUNT_SID=your-account-sid
   TWILIO_AUTH_TOKEN=your-auth-token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register/user` - Register new user
- `POST /api/auth/register/artisan` - Register new artisan
- `POST /api/auth/login/user` - User login
- `POST /api/auth/login/artisan` - Artisan login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/password` - Update password
- `POST /api/auth/forgot-password` - Forgot password
- `PUT /api/auth/reset-password` - Reset password
- `GET /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/resend-verification` - Resend verification email

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `PUT /api/users/profile/me` - Update own profile
- `GET /api/users/favorites` - Get user favorites
- `POST /api/users/favorites/:artisanId` - Add to favorites
- `DELETE /api/users/favorites/:artisanId` - Remove from favorites

### Artisans
- `GET /api/artisans` - Get all artisans (with filters)
- `GET /api/artisans/:id` - Get artisan by ID
- `GET /api/artisans/:id/reviews` - Get artisan reviews
- `PUT /api/artisans/profile/me` - Update own profile (artisan)
- `PUT /api/artisans/location` - Update location
- `PUT /api/artisans/services` - Update services
- `POST /api/artisans/services` - Add new service
- `PUT /api/artisans/services/:serviceId` - Update service
- `DELETE /api/artisans/services/:serviceId` - Delete service
- `POST /api/artisans/portfolio` - Add portfolio item
- `PUT /api/artisans/portfolio/:portfolioId` - Update portfolio
- `DELETE /api/artisans/portfolio/:portfolioId` - Delete portfolio
- `PUT /api/artisans/availability` - Update availability
- `GET /api/artisans/earnings` - Get earnings
- `GET /api/artisans/analytics` - Get analytics

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking
- `PUT /api/bookings/:id/confirm` - Confirm booking
- `PUT /api/bookings/:id/start` - Start booking
- `PUT /api/bookings/:id/complete` - Complete booking
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `POST /api/bookings/:id/review` - Add review
- `GET /api/bookings/analytics` - Get booking analytics

### Services
- `GET /api/services` - Get all services
- `GET /api/services/categories` - Get service categories
- `GET /api/services/categories/:category` - Get services by category
- `GET /api/services/search` - Search services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create new service (artisan)
- `PUT /api/services/:id` - Update service (artisan)
- `DELETE /api/services/:id` - Delete service (artisan)

### Notifications
- `GET /api/notifications` - Get user notifications
- `POST /api/notifications` - Create notification
- `GET /api/notifications/:id` - Get notification by ID
- `PUT /api/notifications/:id` - Update notification
- `DELETE /api/notifications/:id` - Delete notification
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/all` - Delete all notifications
- `GET /api/notifications/unread/count` - Get unread count

### File Upload
- `POST /api/upload/image` - Upload single image
- `POST /api/upload/images` - Upload multiple images
- `DELETE /api/upload/image/:publicId` - Delete image
- `POST /api/upload/avatar` - Upload avatar
- `POST /api/upload/artisan/portfolio` - Upload portfolio images

## Socket.IO Events

### Client to Server
- `update-location` - Update user location
- `booking-status-update` - Update booking status
- `send-message` - Send chat message
- `typing-start` - Start typing indicator
- `typing-stop` - Stop typing indicator
- `set-online` - Set user online
- `set-offline` - Set user offline

### Server to Client
- `notification` - New notification
- `booking-update` - Booking status update
- `new-message` - New chat message
- `message-sent` - Message sent confirmation
- `user-typing` - User typing indicator
- `user-stop-typing` - User stopped typing
- `artisan-location-update` - Artisan location update

## Database Models

### User
- Basic profile information
- Location data
- Preferences and settings
- Favorites and blocked users

### Artisan
- Extended profile information
- Services and pricing
- Portfolio and reviews
- Availability schedule
- Real-time location tracking

### Booking
- Booking details and status
- Location information
- Payment and commission tracking
- Reviews and ratings

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation and sanitization
- File upload restrictions

## Error Handling

- Centralized error handling middleware
- Validation error responses
- Proper HTTP status codes
- Detailed error messages in development

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/artisan-app
JWT_SECRET=your-production-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
SMTP_HOST=your-smtp-host
SMTP_USER=your-email
SMTP_PASS=your-password
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=your-phone-number
```

### PM2 Deployment
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start src/server.js --name "artisan-app-backend"

# Monitor
pm2 monit

# Logs
pm2 logs
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@artisanapp.com or create an issue in the repository. 