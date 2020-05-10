const express = require('express');
const fs = require('fs');
const botSpeak = require('./bot_speak/scripts.json');
const botPrompt = require('./bot_speak/prompts.json');
const bodyParser = require('body-parser');

const VoiceResponse = require('twilio').twiml.VoiceResponse

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getPromptSection(array) {
  const length = array.length;
  return array[getRandomInt(length)];
}

function getPrompt() {
  return getPromptSection(botPrompt.location) +
    getPromptSection(botPrompt.situation)+
    getPromptSection(botPrompt.ask);
}

// Record prompts when artists call in
app.post('/welcome', (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();
  //read scipts from .json

  const gather = twiml.gather({
    numDigits: 1,
    action: '/gather'
  });

  gather.say(botSpeak.hello + botSpeak.continue);

  //if no response
  twiml.say(botSpeak.bye);

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

app.post('/gather', (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();

  // If the user entered digits, process their request
  if (request.body.Digits) {
    switch (request.body.Digits) {
      case '1':
        twiml.redirect('/prompt');
        break;
      case '2':
        twiml.redirect('/bye');
        break;
      default:
        twiml.say("Sorry, I don't understand that choice.");
        twiml.redirect('/welcome');
        break;
    }
  } else {
    // If no input was sent, redirect to the /voice route
    twiml.redirect('/bye');
  }

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

app.post('/prompt', (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();
  console.log(getPrompt());
  twiml.say(getPrompt());
  twiml.record();

  twiml.hangup();
  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
})

app.post('/bye', (request,response) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();
  twiml.say(botSpeak.bye);
  twiml.hangup();
  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

// Create an HTTP server and listen for requests on port 3000
app.listen(3000);

console.log('Server serving on port 3000');
