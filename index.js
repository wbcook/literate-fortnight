// 1. Working with Objects
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
// 2. Array.slice()
// http://stackoverflow.com/questions/5767325/remove-a-particular-element-from-an-array-in-javascript
// 3. CAH Online
// https://github.com/ajanata/PretendYoureXyzzy
// 4. Comet Programming
// https://en.wikipedia.org/wiki/Comet_%28programming%29
var path = require('path');
var express = require('express');
var http = require('http').Server();
var io = require('socket.io')(http);
var app = express();

// set an environmental variable named port with the app port
app.set('port', (process.env.PORT || 3000));

// mount the static middleware at the path '/' to serve files from /public
app.use('/', express.static(path.join(__dirname, 'public')));

// emit chat messages
io.on('connection', function(socket){
  console.log('user connected at ' + new Date());
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    dealRandomCard();
  });
});

// cards listen on port 3000
app.listen(app.get('port'), function() {
  console.log('App started on port: ' + app.get('port'));
});

// chat listens on port 1337
http.listen('1337', function() {
  console.log('Http started on port: ' + '1337');
});

var myDeck = createSampleDeck();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function dealRandomCard() {
  if (myDeck.cards.length > 0) {
    var cardIndex = getRandomInt(0, myDeck.cards.length);
    var randomCard = myDeck.cards.splice(cardIndex, 1)[0];
    // TODO:
    // create new player
    // deal card to player
    // emit updtated player hand model to the client
    io.emit('deal hand', randomCard);
  } else {
    var err = 'there are no more cards in the deck!';
    io.emit('deck empty error', err);
  }
}

function createSampleDeck() {
  var newDeck = new Deck('wilsons deck', 12345, 'a fun deck made by wilson');
  for (var i = 0; i < 12; i++) {
    var name = "card " + i;
    var rule = "card " + i + " rule"
    var code = i;
    var newCard = new Card(name, code, rule);
    newDeck.cards.push(newCard);
  }
  return newDeck;
}

function Card(name, code, rule) {
  this.name = name;
  this.code = code;
  this.rule = rule;
}

function Deck(name, code, description) {
  this.name = name;
  this.code = code;
  this.description = description;
  this.cards = [];
}

function Player(name) {
  this.name = name;
  this.cards = [];
}

function PlayerList() {
  this.players = [];
}

function Table() {
  this.cards = [];
}
