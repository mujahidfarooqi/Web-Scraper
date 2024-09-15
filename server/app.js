const express = require('express');
const path = require('path');
const cors = require('cors'); // Require the CORS middleware
const getInsuranceDetails = require('./scraper');
const Tesseract = require('tesseract.js');

const app = express();
// Allow cross-origin requests from any origin
app.use(cors({
  origin: '*',  // Allow all domains for testing. In production, specify your domain.
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type'
}));

app.use(express.json({ limit: '10mb' })); // Increase the limit for large images
app.use(express.static(path.join(__dirname, '../public')));

// API route to get insurance details
app.post('/get-insurance', async (req, res) => {
  const { image } = req.body;

  // Extract license plate text from image
  try {
    const { data: { text } } = await Tesseract.recognize(
      image,
      'eng',
      { logger: info => console.log(info) }
    );

    // Clean up the recognized text
    const licensePlate = text.trim().toUpperCase(); // Make sure it's uppercase for consistency

    if (licensePlate) {
      // Get insurance details using the license plate
      const insuranceDetails = await getInsuranceDetails(licensePlate);
      console.log('Insurance Details:', insuranceDetails); // Properly log the details
      res.json({ insurance: insuranceDetails });
    } else {
      res.json({ insurance: 'License plate not recognized' });
    }
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
