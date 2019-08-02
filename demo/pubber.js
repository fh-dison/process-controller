// pubber.js
var zmq = require('zeromq')
  , sock = zmq.socket('pub');

sock.bindSync('tcp://127.0.0.1:3005');
console.log('Publisher bound to port 3005');

let count = 0;
setInterval(function(){
  const message = 'Bark! ' + count++;
  console.log(`sending a multipart message envelope [${message}]`);
  sock.send(['heartbeat', message]);
}, 500);
