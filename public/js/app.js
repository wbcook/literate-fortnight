// http://stackoverflow.com/questions/24793255/socket-io-cant-get-it-to-work-having-404s-on-some-kind-of-polling-call
var socket = io('http://localhost:1337');
$('#chat-button').on('click', function(){
  socket.emit('chat message', $('#chat-input-field').val());
  $('#chat-input-field').val('');
  return false;
});
socket.on('chat message', function(msg){
  $('#chat-room').append($('<div>').text(msg));
});
socket.on('deal hand', function(card){
  $('#cards-hand').append('<div class="card">' + card.name + ' | ' + card.rule + '<button class="play-card-button">Play</button></div>');
});
socket.on('deck empty error', function(err){
  $('#cards-hand').append('<div>' + err + '</div>');
});
// $('#play-card-button').on('click', function(){
//   var playedCard = $(this).parent()
//   socket.emit('play card', /* this card name */);
// });
