
const colors = require('colors');
const spawn = require('child_process').spawn;


function run(cmd) {
  return new Promise((resolve, reject) => {
      const command = spawn(cmd);
      console.info(`${'New child process'.inverse}  ${command.pid.toString().bold}\n`);
      var result = '';
      command.stdout.on('data', function(data) {
        console.info(`Worker sent ${data.toString().trim().bold}`.cyan);
           result += data.toString();
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
  let count = 0;
  setInterval(_=> {

    count += 3;
    if (isActive) {
      console.info(`\n**${'Launcher Notification'.bold}** Waiting for worker, active ${count} seconds.\n`.yellow);
      return;
    } 
    isActive = true;
    console.info(`**${'Launcher Notification'.bold}** Launching worker\n`.yellow);

    run('./worker.php')
    .then(result=>{
      console.info(`\nWorker completed successfully after ${count} seconds\n`.green);
      isActive = false;
      count = 0;

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
