require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

app.post('/new-request', async (req, res) => {
    const { name, email, issue_description } = req.body;

    // Set up the transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service
        auth: {
            user: 'your-email@example.com', // Replace with your email
            pass: 'your-email-password' // Replace with your email password (or use app password)
        }
    });

    // Email options
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Replace with the destination email
        subject: 'New Repair Request',
        text: `Name: ${name}\nEmail: ${email}\nIssue: ${issue_description}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Failed to send email.' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
require('dotenv').config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});
