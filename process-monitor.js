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
const colors = require('colors');




function run(cmd) {
  return new Promise((resolve, reject) => {
      var spawn = require('child_process').spawn;
      var command = spawn(cmd)
      console.info('New child process PID', command.pid)
      var result = ''
      command.stdout.on('data', function(data) {
        console.info(`Worker sent ${data.toString().bold}`.cyan);
           result += data.toString()
      })
      command.on('close', function(code) {
          if (code !== 0) {
            console.info(`Child process exited with error ${code}\n`.red);
          }
          resolve(result)
      })
      command.on('error', function(err) { reject(err) })
  })
}

 
  let isActive = false;
  setInterval(_=> {

    if (isActive) {
      console.info(`**${'Launcher Notification'.bold}** Worker is still active, postponing launch\n`.yellow);
      return;
    } 
    isActive = true;
    console.info(`**${'Launcher Notification'.bold}** Launching worker\n`.yellow);

    run('./worker.php')
    .then(result=>{
      isActive = false;
      console.info('Worker completed successfully.'.green);

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
