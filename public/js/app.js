// http://stackoverflow.com/questions/24793255/socket-io-cant-get-it-to-work-having-404s-on-some-kind-of-polling-call
var socket = io('http://localhost:1337');
$('#chat-interface').submit(function(){
  socket.emit('chat message', $('#chat-input-field').val());
  $('#chat-input-field').val('');
  return false;
});
socket.on('chat message', function(msg){
  $('#chat-room').append($('<li>').text(msg));
});
