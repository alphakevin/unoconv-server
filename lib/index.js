const { createApp } = require('./app');
const Converter = require('./converter');

const argv = [...process.argv].slice(2);

function startServer(port, hostname) {
  if (port && port.indexOf(':') >= 0) {
    const arr = port.split(':');
    port = arr[1];
    hostname = arr[0];
  }
  port = port || process.env.PORT || 4000;
  hostname = hostname || process.env.HOSTNAME || 'localhost';
  const app = createApp();
  app.listen(port, hostname, () => {
    console.log(`# unoconv-server started on http://${hostname}:${port}`);
  });
}

if (require.main === module) {
  const command = argv.shift();
  const converter = new Converter();
  switch (command) {
    case undefined:
    case 'help':
      const second = argv.shift();
      if (second === 'converter') {
        converter.ready()
        .then(() => {
          console.log(converter.getHelpText());
        });
        break;
      }
    case '--help':
    case '-h':
      const helpText = [
        'unoconv-server, a simple RESTful server for converting documents',
        '  please visit https://github.com/alphakevin/unoconv-server',
        '',
        'usage: unoconv-server <command> <options>',
        '',
        'commands:',
        '  start [<hostname>[:<port>]]  start the server, default to localhost:4000',
        '  help converter             get converter help',
        '',
        'options:',
        '  -h, --help                 print this help message',
      ];
      console.log(helpText.join('\n'));
      break;
    case 'start':
      startServer(...argv);
      break;
    default:
      console.error('Invalid command');
  }
  if (command === 'start') {
  } else {

  }
}

exports.Converter = Converter;
exports.startServer = startServer;
exports.createApp = createApp;
module.exports = createApp;
