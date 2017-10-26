'use strict';

const apiUrl = require('./config/apiUrl');

const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((request, response) => {response.sendFile(INDEX)})
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));

const webSocketClient = new WebSocket(apiUrl, {
  perMessageDeflate: false
});

let subscriptionMessage = JSON.stringify({
  event: 'subscribe',
  channel: 'trades',
  symbol: 'tBTCUSD'
});

webSocketClient.on('open', () => {
  console.log('Connection opened!');
  webSocketClient.send(subscriptionMessage);
});

webSocketClient.on('message', (data) => {
  console.log(data);
});
