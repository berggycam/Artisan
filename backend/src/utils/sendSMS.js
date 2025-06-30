const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (options) => {
  try {
    const message = await client.messages.create({
      body: options.message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: options.phone
    });

    console.log('SMS sent: %s', message.sid);
    return message;
  } catch (error) {
    console.error('SMS sending failed:', error);
    throw error;
  }
};

module.exports = sendSMS; 