
require('colors');
const spawn = require('child_process').spawn;


function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const command = spawn(cmd, args);
    console.info(`${'New child process'.inverse} ${command.pid.toString().bold}\n`);
    let result = '';
    command.stdout.on('data', data => {
      console.info(`Worker sent ${data.toString().trim().bold}`.cyan);
      result += data.toString();
    })
    command.on('close', code => {
      if (code !== 0) {
        console.info(`\nChild process exited with error ${code}\n`.red.bold);
      }
      resolve(result)
    })
    command.on('error', err => reject(err))
  })
}

 
let isActive = false;
let count = 0;
console.info('Initializing process monitor.. ');
console.info('3..');

setTimeout(_=> console.info('2..'), 1000);
setTimeout(_=> console.info('1..'), 2000);


setInterval(_=> {

  count += 3;
  if (isActive) {
    console.info(`\n**${'Launcher Notification'.bold}** Waiting for worker, active ${count} seconds.\n`.yellow);
    return;
  } 
  isActive = true;
  console.info(`**${'Launcher Notification'.bold}** Launching worker\n`.yellow);

  run('./worker.php', ['param1', 'param2'])
  .then(result=>{
    console.info(`\nWorker completed successfully after ${count} seconds\n`.green);
    isActive = false;
    count = 0;

})
.catch(error=>{console.info (error)});
}, 3000);
 

