const platform = process.platform === 'win32' ? 'cmd' : 'bash';
const terminal = require('child_process').spawn(platform);

terminal.stdin.write('mongorestore -d ujap db/ \n');
terminal.stdin.end();