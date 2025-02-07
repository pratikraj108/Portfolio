   const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 5501;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Check if all fields are provided
    if (!name || !email || !subject || !message) {

        return res.status(400).send('All fields are required.');
    }

    // Nodemailer configuration
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pratikkr14@gmail.com', // Your email
            pass: 'bda fqpn pnpzy zshx' // A
        }
    });


    // Email content
    let mailOptions = {
        from: email,
        to: 'pratikkr14@gmail.com',
        subject: `New Message: ${subject}`,  // Fixing the issue with backticks for string interpolation
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #0056b3;">New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p style="border-left: 4px solid #0056b3; padding-left: 8px; color: #333;">${message}</p>
                <hr style="border: 0; border-top: 1px solid #ccc;">
                <p style="color: #777;">This email was sent from a contact form on your website.</p>
            </div>
        `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {

            return res.status(500).send('Error sending email.');
        }
        res.send('Message sent successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`); // Debugging
});
