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

const 
Reset = "\x1b[0m",
Bright = "\x1b[1m",
Dim = "\x1b[2m",
Underscore = "\x1b[4m",
Blink = "\x1b[5m",
Reverse = "\x1b[7m",
Hidden = "\x1b[8m",

FgBlack = "\x1b[30m",
FgRed = "\x1b[31m",
FgGreen = "\x1b[32m",
FgYellow = "\x1b[33m",
FgBlue = "\x1b[34m",
FgMagenta = "\x1b[35m",
FgCyan = "\x1b[36m",
FgWhite = "\x1b[37m",

BgBlack = "\x1b[40m",
BgRed = "\x1b[41m",
BgGreen = "\x1b[42m",
BgYellow = "\x1b[43m",
BgBlue = "\x1b[44m",
BgMagenta = "\x1b[45m",
BgCyan = "\x1b[46m",
BgWhite = "\x1b[47m";


function run(cmd) {
  return new Promise((resolve, reject) => {
      var spawn = require('child_process').spawn;
      var command = spawn(cmd)
      console.info('New child process PID', command.pid)
      var result = ''
      command.stdout.on('data', function(data) {
        console.info('\x1b[34m Got stdout', data.toString(), Reset);
           result += data.toString()
      })
      command.on('close', function(code) {
          console.info('Child process has stopped returned', code);
          resolve(result)
      })
      command.on('error', function(err) { reject(err) })
  })
}

 
  let isActive = false;
  setInterval(_=> {

    if (isActive) {
      console.info(FgYellow, 'Worker is still active, skipping run', Reset);
      return;
    } 
    isActive = true;
    run('./worker.php')
    .then(result=>{
      isActive = false;
      console.info('Worker spawn was successful.');

  })
  .catch(error=>{console.info (error)});
  }, 3000);
 

// subber.js
/* var zmq = require('zeromq')
  , sock = zmq.socket('sub');

sock.connect('tcp://127.0.0.1:3005');
sock.subscribe('heartbeat');
console.log('ZeroMQ loaded version ' + zmq.version);
console.log('Subscriber connected to port 3005');

sock.on('message', function(topic, message) {

  console.log('received a message type', topic.toString(), 'containing message:', message.toString());
}); */
