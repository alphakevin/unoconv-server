const os = require('os');
const fs = require('fs');
const mime = require('mime-types');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid');
const contentDisposition = require('content-disposition');

const { ApiError } = require('./errors');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, os.tmpdir());
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = `${uuid.v4()}${ext}`;
    cb(null, name);
  }
});

const uploadRaw = () => {
  return (req, res, next) => {
    const contentType = req.get('Content-Type');
    const contentDisp = req.get('Content-Disposition');
    if (contentType && contentType.indexOf('form-data/multipart') === 0) {
      next();
    }
    if (!contentType || !contentDisp) {
      throw new ApiError(400, 'Could not find Content-Type or Content-Disposition header');
    }
    const parsed = contentDisposition.parse(contentDisp);
    if (!parsed || !parsed.parameters || !parsed.parameters.filename) {
      throw new ApiError('invalid Content-Disposition header');
    }
    const { filename } = parsed.parameters;
    const ext = path.extname(filename);
    const newFilename = `${uuid.v4()}${ext}`;
    const filePath = `${os.tmpdir()}/${newFilename}`
    const fileStream = fs.createWriteStream(filePath);
    fileStream.on('finish', () => {
      req.file = {
        originalname: filename,
        filename: newFilename,
        path: filePath,
      };
      next();
    });
    req.pipe(fileStream);
  };
};

exports.uploadRaw = uploadRaw;
exports.storage = storage;
