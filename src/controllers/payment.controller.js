const Stripe = require('stripe');
const config = require('../config');

const stripe = new Stripe(config.stripeSecretKey);

const pricingOptions = [
  { books: 1, price: 35, freeShipping: false },
  { books: 2, price: 45, freeShipping: false },
  { books: 3, price: 50, freeShipping: true },
];

exports.createPaymentIntent = async (req, res) => {
  const { books } = req.body;
  if (!books) {
    return res.status(400).json({ success: false, error: 'Number of books is required' });
  }

  try {
    const pricing = pricingOptions.find(option => option.books === books);
    if (!pricing) {
      return res.status(400).json({ success: false, error: 'Invalid number of books selected' });
    }

    const amount = pricing.price * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      freeShipping: pricing.freeShipping,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error creating payment intent' });
  }
};

module.exports = exports;