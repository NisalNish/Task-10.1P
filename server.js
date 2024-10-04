const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const path = require('path');

const app = express();
const port = 3000;


sgMail.setApiKey('process.env.SENDGRID_API_KEY');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    const msg = {
        to: email,
        from: 'mailwajirapani@gmail.com', 
        subject: 'Welcome to DEV@Deakin',
        text: 'Thank you for subscribing to DEV@Deakin!',
        html: '<strong>Thank you for subscribing to DEV@Deakin!</strong>',
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
            res.status(200).send('Welcome email sent successfully');
        })
        .catch((error) => {
            console.error(error.toString()); // Log the error details
            res.status(500).send('Error sending welcome email');
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
