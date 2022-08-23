"use strict";

/** Common config for message.ly */

// read .env files and make environmental variables

require("dotenv").config();

/** MAC EDITION */
// const DB_URI = (process.env.NODE_ENV === "test")
//     ? "postgresql:///messagely_test"
//     : "postgresql:///messagely";

/** WINDOWS EDITION */
const DB_URI = process.env.NODE_ENV === "test"
? "postgresql://esoun:esoun@localhost/messagely_test"
: "postgresql://esoun:esoun@localhost/messagely";

const SECRET_KEY = process.env.SECRET_KEY || "secret";

const BCRYPT_WORK_FACTOR = 12;

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

module.exports = {
  DB_URI,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN
};

