// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

"use strict";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = require("./config");

const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const SEND_TWILIO_MESSAGE = client.messages
  .create({
     body: `This is an auto-generated message from your boyfriend to wish you HAPPY BIRTHDAY! 
        Reply STOP to opt out. (J/K you can't ❤️)`,
     from: '+17622465378',
     to: '+17274207753'
   })
  .then(message => console.log(message.sid));

module.exports = SEND_TWILIO_MESSAGE;