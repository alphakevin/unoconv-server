const os = require('os');
const path = require('path');
const express = require('express');
const mime = require('mime-types');
const multer = require('multer');
const uuid = require('uuid');
const contentDisposition = require('content-disposition');

const Converter = require('./converter');
const { ApiError, errorHandler } = require('./errors');
const storage = require('./storage');

function createApp() {
  const app = express();
  const converter = new Converter();
  app.converter = converter;
  converter.startListener();
  const upload = multer({
    storage: storage,
  });
  
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
  
  app.get('/help', (req, res, next) => {
    res.set('Content-Type', 'text/plain');
    res.send(converter.getHelpText());
  });
  
  app.post('/convert/:command(*)', upload.single('file'), (req, res, next) => {
    const { file } = req;
    if (!file) {
      throw new ApiError(400, 'cannot find input file');
    }
    const { command } = req.params;
    const { args, options } = converter.parseUrlCommand(command);
    const output = converter.convertToStream(args, file.path);
    res.set('Content-Type', mime.contentType(options.format));
    const filename = options.output || `${path.parse(file.originalname).name}.${options.format}`;
    res.set('Content-Disposition', filename);
    output.pipe(res);
    output.on('error', error => {
      console.error(error);
    });
  });

  app.use(errorHandler);
  
  return app;
}

exports.createApp = createApp;
