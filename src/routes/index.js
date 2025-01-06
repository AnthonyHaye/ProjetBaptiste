const express = require('express');
const router = express.Router();

const bookRoutes = require('./book.routes');
const paymentRoutes = require('./payment.routes');
const projectRoutes = require('./project.routes');

router.use('/api/books', bookRoutes);
router.use('/api/payments', paymentRoutes);
router.use('/api/projects', projectRoutes);

module.exports = router;