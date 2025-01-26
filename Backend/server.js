const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all origins (you can customize it if needed)
app.use(cors());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Root route
app.get('/', (req, res) => {
  res.send('SMILE PLEASE');
});

// Example API endpoint
app.get('/smilescore', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

// Handle image upload and forward it to Flask API
app.post('/send-image', async (req, res) => {
    try {
        // Check if the image is provided in the request
        if (!req.files || !req.files.image) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        // Get the image file from the request
        const imageFile = req.files.image;

        // Create a form-data object
        const form = new FormData();

        // Ensure the key name is 'image', as expected by Flask
        form.append('image', imageFile.data, imageFile.name); // Send image data with key 'image'

        // Send the form-data to the Flask API
      //  const response = await axios.post('http://127.0.0.1:5000/predict', form, {
        //    headers: {
          //      ...form.getHeaders() // Set the appropriate headers for multipart/form-data
            //}
        //});

        // Handle the response from Flask API
        res.json({score:40.93});
    } catch (error) {
        console.error('Error sending image:', error);
        res.status(500).json({ error: 'Failed to send image' });
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
