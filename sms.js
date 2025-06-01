const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendSMS(body) {
  await client.messages.create({
    body,
    from: process.env.TWILIO_FROM,
    to: process.env.TWILIO_TO
  });
}

module.exports = sendSMS;
