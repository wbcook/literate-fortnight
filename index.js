// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
// http://stackoverflow.com/questions/5767325/remove-a-particular-element-from-an-array-in-javascript
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
  dealRandomCard();
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
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

var myDeck = createNewDeck();

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

function createNewDeck() {
  var newDeck = new Deck();
  for (var i = 0; i < 12; i++) {
    var name = "card " + i;
    var rule = "card " + i + " rule"
    var newCard = new Card(name, rule);
    newDeck.cards.push(newCard);
  }
  return newDeck;
}

function Card(name, rule) {
  this.name = name;
  this.rule = rule;
}

function Deck() {
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
