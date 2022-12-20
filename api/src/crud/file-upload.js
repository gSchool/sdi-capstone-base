const multer = require('multer');

// const MIME_TYPE_MAP = {
//   'application/pdf': 'pdf',
//   'application/docx': 'docx',
//   'applicaton/pptx': 'pptx'
// }

const randInt = () => {
  return Math.floor(Math.random() * 10000)
}

const fileUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/uploads')
    },
    filename: function (req, file, cb) {
      // const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, randInt() + '_' + file.originalname);
    }
  })
});

module.exports = fileUpload;