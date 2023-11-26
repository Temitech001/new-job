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
    const { fullName, email, phoneNumber, coverLetter, cvFile, driverLicense, ssnCopy } = req.body;
    const cvFileName = cvFile.name;
    const driverLicenseFileName = driverLicense.name;
   
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
          filename: cvFile.name, // Change the filename as needed
          content: cvFile.buffer, // Assuming cvFile is a Buffer
        },
        // Attach the Driver License file
        {
          filename: driverLicense.name, // Change the filename as needed
          content: driverLicense.buffer, // Assuming driverLicense is a Buffer
        },
        // Attach the SSN Copy file
        {
          filename: ssnCopy.name, // Change the filename as needed
          content: ssnCopy.buffer, // Assuming ssnCopy is a Buffer
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
