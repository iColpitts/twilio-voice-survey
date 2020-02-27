// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  ACCOUNT_ID: process.env.ACCOUNT_ID,
  TOKEN: process.env.TOKEN,
  URL: process.env.URL,
  PHONE_NUMBER: process.env.PHONE_NUMBER
};
