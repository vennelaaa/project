const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default to 3000

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/portfolio', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for the contact form data
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Handle form submissions
app.post('/submit_form', (req, res) => {
    const { name, email, message } = req.body;

    const newContact = new Contact({ name, email, message });

    newContact.save((err) => {
        if (err) {
            res.status(500).send('Error saving data.');
        } else {
            res.status(200).send('Data saved successfully.');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
