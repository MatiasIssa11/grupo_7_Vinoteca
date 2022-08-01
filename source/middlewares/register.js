const multer = require("multer");
const storage = require("../modules/storage");
const upload = multer({ storage: storage("users") });
const register = require("../validaciones/register");

module.exports = [upload.any(), register];
