#!/usr/bin/env node

// native
const { spawn, exec } = require('child_process');
const net = require('net');

// libs
const { port } = require('./config.js');
const { help, version } = require('./help.js');

if (process.argv.indexOf('help') != -1) {
  help();
  process.exit();
};

if (process.argv.indexOf('--version') != -1
    || process.argv.indexOf('-v') != -1) {
  version();
  process.exit();
};

if (process.argv.indexOf('listen') != -1) {
  // start windows-server and exit parent
  const listen = spawn('node', [__dirname+'/listen.js'], {
    detached: true,
    stdio: ['ignore', 'ignore', 'ignore']
  });
  process.exit();
} else if (process.argv.indexOf('sent') != -1) {
  // sent text from bash to windows-server
  const options = { port: port, host: 'localhost' };
  const sent = {};

  // sent timer to windows-server
  if (process.argv.indexOf('--timer')) {
    sent.timer = process.argv[process.argv.indexOf('--timer')+1];
  }

  // sent text to windows-server
  if (process.argv.indexOf('--text') != -1) {
    sent.text = process.argv[process.argv.indexOf('--text')+1];
    if (!sent.text) {
      console.error('no text was given');
      process.exit();
    }

    const client  = net.connect(options, () => {
      client.end(JSON.stringify(sent));
    });

    client.on('error', err => {
      console.log(`ERROR: check if your server is running or if your Port ${port} is already in use.`);
      console.error(err);
    });
  }
} else if (process.argv.indexOf('autostart') != -1) {
  // adds command to autostart
  exec(__dirname+'/add_to_autostart.bat', (error, stdout, stderr) => {
    console.log(stdout);
  });
} else {
  console.log(`\r\nCommand not found`);
  help();
}