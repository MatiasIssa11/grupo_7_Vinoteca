const { readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");
const { hashSync } = require("bcryptjs");

const usersModel = {
  index: function () {
    let file = resolve(__dirname, "../data", "users.json");
    let data = readFileSync(file);
    return JSON.parse(data);
  }, // Trae la informacion del users.json como objeto literal.

  one: function (id) {
    let file = resolve(__dirname, "../data", "users.json");
    let data = readFileSync(file);
    let users = JSON.parse(data);
    return users.find((user) => user.id === id);
  }, // Trae el detalle del users.json del id indicado. La info la toma el user.controller.js.

  findEmail: function (email) {
    let file = resolve(__dirname, "../data", "users.json");
    let data = readFileSync(file);
    let users = JSON.parse(data);
    return users.find((user) => user.email === email);
  }, // Trae el detalle del users.json del email indicado. La info la toma el user.controller.js.

  create: function (data) {
    let file = resolve(__dirname, "../data", "users.json");
    let info = readFileSync(file);
    let users = JSON.parse(info);
    let lastUser = users[users.length - 1];
    return Object({
      id: users.length == 0 ? 1 : lastUser.id + 1,
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      fechaNacimiento: data.fechaNacimiento,
      avatar: data.avatar,
      password: hashSync(data.password, 10), //Se guarda encriptada la contraseña
      category: data.email.includes("@cavawines") ? "admin" : "user",
    });
  }, // Crea un nuevo usuario

  write: function (data) {
    let file = resolve(__dirname, "../data", "users.json");
    let info = JSON.stringify(data, null, 2);
    return writeFileSync(file, info);
  }, // "Edita" el users.json pisandolo con un nuevo archivo modificado.

};

module.exports = usersModel;