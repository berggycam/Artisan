const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Artisan = require('./models/Artisan');
const Booking = require('./models/Booking');

module.exports = (io) => {
  // Store connected users
  const connectedUsers = new Map();
  const connectedArtisans = new Map();

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if user exists
      const user = await User.findById(decoded.id);
      const artisan = await Artisan.findById(decoded.id);
      
      if (!user && !artisan) {
        return next(new Error('User not found'));
      }

      socket.userId = decoded.id;
      socket.userType = user ? 'user' : 'artisan';
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', async (socket) => {
    console.log(`User connected: ${socket.userId} (${socket.userType})`);

    // Join user to their personal room
    socket.join(socket.userId);

    // Store connection
    if (socket.userType === 'user') {
      connectedUsers.set(socket.userId, socket.id);
    } else {
      connectedArtisans.set(socket.userId, socket.id);
      
      // Update artisan online status
      await Artisan.findByIdAndUpdate(socket.userId, {
        isOnline: true,
        lastSeen: new Date()
      });
    }

    // Handle location updates (for real-time tracking)
    socket.on('update-location', async (data) => {
      try {
        const { latitude, longitude } = data;
        
        if (socket.userType === 'artisan') {
          await Artisan.findByIdAndUpdate(socket.userId, {
            currentLocation: {
              latitude,
              longitude,
              lastUpdated: new Date()
            },
            lastSeen: new Date()
          });

          // Notify users with active bookings from this artisan
          const activeBookings = await Booking.find({
            artisanId: socket.userId,
            currentStatus: { $in: ['confirmed', 'in_progress'] }
          });

          activeBookings.forEach(booking => {
            io.to(booking.userId.toString()).emit('artisan-location-update', {
              artisanId: socket.userId,
              location: { latitude, longitude },
              bookingId: booking._id
            });
          });
        }
      } catch (error) {
        console.error('Location update error:', error);
      }
    });

    // Handle booking status updates
    socket.on('booking-status-update', async (data) => {
      try {
        const { bookingId, status, message } = data;
        
        const booking = await Booking.findById(bookingId);
        if (!booking) return;

        // Add status update
        await booking.addStatus(status, message);

        // Notify both user and artisan
        io.to(booking.userId.toString()).emit('booking-updated', {
          bookingId,
          status,
          message,
          timestamp: new Date()
        });

        io.to(booking.artisanId.toString()).emit('booking-updated', {
          bookingId,
          status,
          message,
          timestamp: new Date()
        });
      } catch (error) {
        console.error('Booking status update error:', error);
      }
    });

    // Handle chat messages
    socket.on('send-message', async (data) => {
      try {
        const { recipientId, message, bookingId } = data;
        
        const messageData = {
          senderId: socket.userId,
          senderType: socket.userType,
          recipientId,
          message,
          bookingId,
          timestamp: new Date()
        };

        // Send to recipient
        io.to(recipientId).emit('new-message', messageData);
        
        // Send back to sender for confirmation
        socket.emit('message-sent', messageData);
      } catch (error) {
        console.error('Message sending error:', error);
      }
    });

    // Handle typing indicators
    socket.on('typing-start', (data) => {
      const { recipientId } = data;
      io.to(recipientId).emit('user-typing', {
        userId: socket.userId,
        userType: socket.userType
      });
    });

    socket.on('typing-stop', (data) => {
      const { recipientId } = data;
      io.to(recipientId).emit('user-stop-typing', {
        userId: socket.userId,
        userType: socket.userType
      });
    });

    // Handle online/offline status
    socket.on('set-online', async () => {
      if (socket.userType === 'artisan') {
        await Artisan.findByIdAndUpdate(socket.userId, {
          isOnline: true,
          lastSeen: new Date()
        });
      }
    });

    socket.on('set-offline', async () => {
      if (socket.userType === 'artisan') {
        await Artisan.findByIdAndUpdate(socket.userId, {
          isOnline: false,
          lastSeen: new Date()
        });
      }
    });

    // Handle disconnect
    socket.on('disconnect', async () => {
      console.log(`User disconnected: ${socket.userId} (${socket.userType})`);

      // Remove from connected users
      if (socket.userType === 'user') {
        connectedUsers.delete(socket.userId);
      } else {
        connectedArtisans.delete(socket.userId);
        
        // Update artisan offline status
        await Artisan.findByIdAndUpdate(socket.userId, {
          isOnline: false,
          lastSeen: new Date()
        });
      }
    });
  });

  // Helper functions for other parts of the app
  const socketHelpers = {
    // Send notification to user
    sendNotification: (userId, notification) => {
      const socketId = connectedUsers.get(userId) || connectedArtisans.get(userId);
      if (socketId) {
        io.to(socketId).emit('notification', notification);
      }
    },

    // Send notification to multiple users
    sendNotificationToMultiple: (userIds, notification) => {
      userIds.forEach(userId => {
        socketHelpers.sendNotification(userId, notification);
      });
    },

    // Send booking update to user
    sendBookingUpdate: (userId, bookingUpdate) => {
      const socketId = connectedUsers.get(userId) || connectedArtisans.get(userId);
      if (socketId) {
        io.to(socketId).emit('booking-update', bookingUpdate);
      }
    },

    // Send message to user
    sendMessage: (userId, message) => {
      const socketId = connectedUsers.get(userId) || connectedArtisans.get(userId);
      if (socketId) {
        io.to(socketId).emit('new-message', message);
      }
    },

    // Check if user is online
    isUserOnline: (userId) => {
      return connectedUsers.has(userId) || connectedArtisans.has(userId);
    },

    // Get online users count
    getOnlineUsersCount: () => {
      return connectedUsers.size + connectedArtisans.size;
    }
  };

  return socketHelpers;
}; 