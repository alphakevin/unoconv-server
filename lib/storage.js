const os = require('os');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid');

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

module.exports = storage;
