const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configure multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/submit', upload.fields([
  { name: 'cvFile', maxCount: 1 },
  { name: 'ssnCopy', maxCount: 1 },
  { name: 'driverLicense', maxCount: 1 }
]), async (req, res) => {
  try {
    const { fullName, email, phoneNumber, coverLetter } = req.body;
    const cvFile = req.files['cvFile'][0];
    const ssnCopy = req.files['ssnCopy'][0];
    const driverLicense = req.files['driverLicense'][0];

    const message = `
      Full Name: ${fullName}
      Email: ${email}
      Phone Number: ${phoneNumber}
      Cover Letter: ${coverLetter}
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: 'New Job Application',
      text: message,
      attachments: [
        { filename: 'cv.pdf', content: cvFile.buffer },
        { filename: 'ssn.pdf', content: ssnCopy.buffer },
        { filename: 'driverLicense.pdf', content: driverLicense.buffer },
      ],
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send('Application submitted successfully.');
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).send('Internal server error.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
