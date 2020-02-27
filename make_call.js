// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
// undefined
const { ACCOUNT_ID, TOKEN, URL, PHONE_NUMBER } = require('./config');

const accountSid = ACCOUNT_ID;
const authToken = TOKEN;
const client = require('twilio')(accountSid, authToken);
console.log('running...?' + PHONE_NUMBER)
client.calls
      .create({
         url: URL,
         to: '+14166292474',
         from: PHONE_NUMBER,
       })
      .then(call => console.log(call.sid));
