const os = require('os');
const path = require('path');
const express = require('express');
const mime = require('mime-types');
const multer = require('multer');
const uuid = require('uuid');
const { wrap } = require('async-middleware');
const contentDisposition = require('content-disposition');
const packageJson = require('../package.json');

const Converter = require('./converter');
const { ApiError, errorHandler } = require('./errors');
const { storage, uploadRaw } = require('./storage');

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
    res.set('X-Powered-By', `${packageJson.name}@${packageJson.version}`)
    next();
  });
  
  app.get('/help', (req, res, next) => {
    res.set('Content-Type', 'text/plain');
    res.send(converter.getHelpText());
  });

  app.post('/convert/:command(*)',
   uploadRaw(),
   upload.single('file'),
   wrap(async (req, res, next) => {
      const { file } = req;
      if (!file) {
        throw new ApiError(400, 'cannot find input file');
      }
      const { command } = req.params;
      const { args, options } = converter.parseUrlCommand(command);
      const outputFile = await converter.convert(file.path, args, options);
      const filename = options.output || `${path.parse(file.originalname).name}.${options.format}`;
      res.set('Content-Disposition', contentDisposition(filename));
      res.sendFile(outputFile);
    })
  );

  app.use(errorHandler);
  
  return app;
}

exports.createApp = createApp;
