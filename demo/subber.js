// subber.js
var zmq = require('zeromq')
  , sock = zmq.socket('sub');

sock.connect('tcp://127.0.0.1:3005');
sock.subscribe('heartbeat');
console.log('ZeroMQ loaded version ' + zmq.version);
console.log('Subscriber connected to port 3005');

sock.on('message', function(topic, message) {

  console.log('Received ', topic.toString(),  message.toString());
});


