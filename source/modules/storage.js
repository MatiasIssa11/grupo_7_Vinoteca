const { diskStorage } = require("multer");
const { extname } = require("path");

let destination = function (folder) {
  return (req, file, callback) => callback(null, "../../" + folder);
};

let filename = (req, file, callback) => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  callback(
    null,
    file.fieldname + "-" + uniqueSuffix + extname(file.originalname)
  );
};

const storage = function (folder) {
  return diskStorage({
    destination: destination(folder),
    filename: filename,
  });
};

module.exports = storage;
