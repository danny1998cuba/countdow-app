const nodeMail = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config();

async function mainMail(to, subject, message) {
    const transporter = await nodeMail.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.PASSWORD,
        },
    });

    const mailOption = {
        from: process.env.GMAIL_USER,
        to: to,
        subject: subject,
        html: message,
    };
    try {
        await transporter.sendMail(mailOption);
        return Promise.resolve("Message Sent Successfully!");
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = mainMail