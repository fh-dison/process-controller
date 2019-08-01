/* (function() {
  var childProcess = require("child_process");
  var oldSpawn = childProcess.spawn;
  function mySpawn() {
      console.log('spawn called');
      console.log(arguments);
      var result = oldSpawn.apply(this, arguments);
      return result;
  }
  childProcess.spawn = mySpawn;
})(); */

function run(cmd) {
  return new Promise((resolve, reject) => {
      var spawn = require('child_process').spawn;
      var command = spawn(cmd)
      var result = ''
      command.stdout.on('data', function(data) {
           result += data.toString()
      })
      command.on('close', function(code) {
          resolve(result)
      })
      command.on('error', function(err) { reject(err) })
  })
}

//run('/bin/ls').then(result=>{console.info(result);}).catch(error=>{console.info (error)});
run('./worker.php').then(result=>{console.info(result);}).catch(error=>{console.info (error)});


// subber.js
var zmq = require('zeromq')
  , sock = zmq.socket('sub');

sock.connect('tcp://127.0.0.1:3005');
sock.subscribe('heartbeat');
console.log('ZeroMQ loaded version ' + zmq.version);
console.log('Subscriber connected to port 3005');

sock.on('message', function(topic, message) {

  console.log('received a message type', topic.toString(), 'containing message:', message.toString());
});
