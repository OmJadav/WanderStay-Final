const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// router.post('/', async (req, res) => {
//   const { to, subject, text } = req.body;

//   const mailOptions = {
//     from: process.env.EMAIL_USERNAME,
//     to,
//     subject,
//     text,
//   };

//   try {
//     // Send email
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Email sent successfully' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


router.post('/', async (req, res) => {
    res.send("Hello done")
})
module.exports = router;
