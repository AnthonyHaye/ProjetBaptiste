const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./src/routes');
const config = require('./src/config');
const errorHandler = require('./src/middleware/errorHandler');
const rateLimiter = require('./src/middleware/rateLimiter');
const { initializeFirebase } = require('./src/services/firebase');

// Initialize Firebase
initializeFirebase();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

// Start server
const PORT = config.port || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});