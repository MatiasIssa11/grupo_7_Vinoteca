const multer = require("multer");
const storage = require("../modules/storage");
const upload = multer({ storage: storage("users") });
const editUser = require("../validaciones/editUser");

module.exports = [upload.any(), editUser];
