const net     = require('net');
const ncp     = require('copy-paste');
const {spawn} = require('child_process');
const {port}  = require('./config.js');

const server = net.createServer();
server.listen(port);

server.on('connection', conn => {
  if (!conn.remoteAddress.match(/127\.0\.0\.1|::ffff/)) {
    conn.destroy();
  }

  conn.on('data', data => {
    parseData(data.toString());
  });

  conn.on('error', err => {
    console.error(err);
  });
});

function parseData(data) {
  const prev = ncp.paste();
  const res  = JSON.parse(data);

  if (res.text) {
    ncp.copy(res.text);
  }

  if (res.timer) {
    setTimeout(() => {
      ncp.copy(prev);
    }, res.timer*1000);
  }
}