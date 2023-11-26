const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

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

app.post('/submit-application', (req, res) => {
  try {
    const { fullName, email, phoneNumber, coverLetter } = req.body;
    // Access the file data from the request
    const { cvFile, driverLicense, ssnCopy } = req.body;
     
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: 'New Job Application',
      text: `
        Full Name: ${fullName}
        Email: ${email}
        Phone Number: ${phoneNumber}
        Cover Letter: ${coverLetter}
        CV : ${cvFile.content}
      `,
      attachments: [
        {
          filename: cvFile.name,
          content: cvFile.content, // Include file content
        },
        {
          filename: driverLicense.name,
          content: driverLicense.content, // Include file content
        },
        {
          filename: ssnCopy.name,
          content: ssnCopy.content, // Include file content
        },
      ]
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