// pubber.js
var zmq = require('zeromq')
  , sock = zmq.socket('pub');

sock.bindSync('tcp://127.0.0.1:3005');
console.log('Publisher bound to port 3005');

setInterval(function(){
  console.log('sending a multipart message envelope');
  sock.send(['kitty cats!', 'meow!']);
}, 500);
