const express = require('express');
const router = express.Router();
const { saveProject } = require('../controllers/project.controller');

router.post('/save', saveProject);

module.exports = router;