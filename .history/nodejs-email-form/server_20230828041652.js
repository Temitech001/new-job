const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');




dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Add this before defining routes
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (e.g., your React app)
app.use(express.static(path.join(__dirname, 'client/build')));

// Create a transporter object using Nodemailer with your email service details
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const transporter = nodemailer.createTransport({
  service: 'Gmail', // or your email service
  auth: {
    user: 'your-email@gmail.com', // your Gmail email address
    pass: 'your-app-password', // the App Password you generated
  },
});


// API endpoint to handle form submissions
app.post('/submit-application', (req, res) => {
  // Get form data from the request
  const { fullName, email, phoneNumber, coverLetter } = req.body;

  // Create the email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: 'New Job Application',
    text: `
      Full Name: ${fullName}
      Email: ${email}
      Phone Number: ${phoneNumber}
      Cover Letter: ${coverLetter}
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email: ', error);
      res.status(500).send('Error submitting application.');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Application submitted successfully.');
    }
  });
});

// Handle production environment
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
