import { folder1Ref, folder2Ref, folder3Ref } from '../src/components/server/firebase';

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

const { getDownloadURL } = require('firebase/storage');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

// Create a transporter object using Nodemailer with your email service details
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Gmail SMTP host
  port: 587, // Port for secure SMTP (587 for TLS, 465 for SSL, 25 for non-secure)
  secure: false, // Use TLS for secure connection (true for TLS, false for non-secure)
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail email address
    pass: process.env.EMAIL_PASS, // Your email password or App Password
  },
});

app.post('/submit-application', async (req, res) => {
  try {
    const { fullName, email, phoneNumber, coverLetter, cvFile, driverLicense, ssnCopy } = req.body;
    const cvUrl = await getDownloadURL(ref(storage, 'folder1', cvFile.name));
    const driverLicenseUrl = await getDownloadURL(driverLicense); // Get Driver License file URL
    const ssnCopyUrl = await getDownloadURL(ssnCopy); // Get SSN Copy file URL
     
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
      attachments: [
        // Attach the CV file
        {
          filename: cvFile.name, // Set the filename
          path: cvUrl, // Set the file URL
        },
        // Attach the Driver License file
        {
          filename: driverLicense.name, // Set the filename
          path: driverLicenseUrl, // Set the file URL
        },
        // Attach the SSN Copy file
        {
          filename: ssnCopy.name, // Set the filename
          path: ssnCopyUrl, // Set the file URL
        },
      ],      
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email.');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Application submitted successfully.');
      }
    });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).send('Internal server error.');
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
