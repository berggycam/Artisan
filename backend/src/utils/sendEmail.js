const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  // Define email options
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // Send email
  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail; 