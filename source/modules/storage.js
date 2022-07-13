const {diskStorage} = require('multer');
const {extname,resolve} = require('path');

const destination = function (folder){
   return (req, file, callback) => callback(null, '../../public/uploads/')
};

const filename = (req, file, callback) => {
   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
   callback(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
}

const storage = function(folder){
   return diskStorage({
       destination: destination(folder),
       filename: filename
   });
};

module.exports = storage;