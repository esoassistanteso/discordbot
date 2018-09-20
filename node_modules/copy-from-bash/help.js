const { version } = require('./package.json');

module.exports.help = function() {

const output = `

Usage: copyfb [listen || sent --text "sample text" [--timer 45000]]


  Commands:

    help           Display help
    sent           (bash) Will sent data to the server (requires --text option)
    listen         (windows) Starts server in background that listens on port 65467
    autostart      (windows) Adds "copyfb listen" to the windows autostart

  Options:
    
    --version, -v           Prints the current version
    --text "sample text"    Text that will be copied to clipboard
    --timer 45              (Optional) Will overwrite the new clipboard with the old clipboard
                                       after the given time

  More:

    https://github.com/andybitz/copy-from-bash

    (bash) You can use clip to pipe your output.
    e.g.
      echo "sample text" | clip    // for 45 seconds
      echo "sample text" | clip 10 // for 10 seconds
      echo "sample text" | clip 0  // forever

`;

console.log(output);

};

module.exports.version = function() {
  console.log(version);
};