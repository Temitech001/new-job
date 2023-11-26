const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/submit-application', (req, res) => {
  // Get form data from the request
  const { fullName, email, phoneNumber, cvFile, coverLetter, ssnCopy, driverLicense } = req.body;

  // Create a transporter object using Nodemailer with your email service details
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

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
    attachments: [
      {
        filename: 'CV.pdf',
        path: cvFile, // Provide the path to the uploaded CV file
      },
      {
        filename: 'SSN.pdf',
        path: ssnCopy, // Provide the path to the uploaded SSN copy file
      },
      {
        filename: 'DriverLicense.pdf',
        path: driverLicense, // Provide the path to the uploaded driver's license file
      },
    ],
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
