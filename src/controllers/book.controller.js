const { Configuration, OpenAIApi } = require('openai');
const firebaseAdmin = require('firebase-admin');
const config = require('../config');

const openAiConfig = new Configuration({
  apiKey: config.openaiApiKey
});
const openai = new OpenAIApi(openAiConfig);

exports.generateCover = async (req, res) => {
  const { prompt, title, profession } = req.body;
  if (!prompt || !title || !profession) {
    return res.status(400).json({ success: false, error: 'Prompt, title, and profession are required' });
  }

  try {
    const fullPrompt = `${prompt} The title "${title}" should be prominently displayed in a clean, child-friendly font. Under the title, include the profession "${profession}" in Poppins font, ensuring all elements adhere to a consistent style.`;
    const response = await openai.createImage({
      prompt: fullPrompt,
      n: 1,
      size: '1024x1024',
    });
    res.status(200).json({ success: true, imageUrl: response.data.data[0].url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error generating image' });
  }
};

// Implement other controller methods...

module.exports = exports;