const multer = require("multer");
const storage = require("../modules/storage");
const upload = multer({ storage: storage("products") });
const createProduct = require("../validaciones/createProduct");

module.exports = [upload.any(), createProduct];
