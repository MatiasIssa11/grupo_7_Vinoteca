const multer = require("multer");
const storage = require("../modules/storage");
const upload = multer({ storage: storage("products") });
const editProduct = require("../validaciones/editProduct");

module.exports = [upload.any(), editProduct];
