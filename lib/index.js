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
      console.log('usage: unoconv-server <command> <options>');
      console.log('');
      console.log('Restful server for unoconv');
      console.log('Default port is 4000');
      console.log('Default hostname is 127.0.0.1');
      console.log('');
      console.log('commands:');
      console.log('  start <hostname>[:port]  start the server');
      console.log('  help converter           get converter help');
      console.log('');
      console.log('options:');
      console.log('  -h, --help               print this help message');
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
