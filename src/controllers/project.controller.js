const firebaseAdmin = require('firebase-admin');
const config = require('../config');

exports.saveProject = async (req, res) => {
  const { userId, projectData } = req.body;
  if (!userId || !projectData) {
    return res.status(400).json({ success: false, error: 'User ID and project data are required' });
  }

  try {
    const bucket = firebaseAdmin.storage().bucket();
    const file = bucket.file(`user-projects/${userId}-${Date.now()}-project.json`);
    await file.save(JSON.stringify(projectData), {
      contentType: 'application/json',
      public: false,
    });

    res.status(200).json({ success: true, message: 'Project saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error saving project' });
  }
};

module.exports = exports;