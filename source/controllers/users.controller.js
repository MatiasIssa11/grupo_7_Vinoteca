const { hashSync } = require("bcryptjs");
const { validationResult } = require("express-validator");
const { user, image } = require("../database/models/index");

module.exports = {
  register: async (req, res) => {
    return res.render("./users/register", {
      title: "Cava Wines-Registro",
      styles: [
        "users/register-mobile",
        "users/register-tablet",
        "users/register-desktop",
      ],
      script: "register.js",
    });
  },

  process: async (req, res) => {
    let validaciones = validationResult(req);
    let { errors } = validaciones;

    if (errors && errors.length > 0) {
      return res.render("./users/register", {
        title: "Cava Wines-Registro",
        styles: [
          "users/register-mobile",
          "users/register-tablet",
          "users/register-desktop",
        ],
        errors: validaciones.mapped(),
        oldData: req.body,
        script: "register.js",
      });
    }

    req.body.password = hashSync(req.body.password, 10);
    req.body.isAdmin = String(req.body.email)
      .toLowerCase()
      .includes("@cavawines.com");

    let avatar;
    if (req.files && req.files.length > 0) {
      avatar = await image.create({
        path: req.files[0].filename,
      });
    } else {
      avatar = await image.create({
        path: "default-user.svg",
      });
    }
    req.body.avatar = avatar.id;

    await user.create(req.body);

    return res.redirect("/users/login");
  },

  edit: async (req, res) => {
    let oneUser = await user.findByPk(req.session.user.id, {
      include: { all: true },
    });
    if (!oneUser) {
      return res.redirect("/products/");
    }
    return res.render("./users/edit", {
      title: "Cava Wines-Edicion Usuario",
      styles: [
        "/users/edit-mobile",
        "/users/edit-tablet",
        "/users/edit-desktop",
      ],
      user: oneUser,
      script: "editUser.js",
    });
  },

  modify: async (req, res) => {
    let oneUser = await user.findByPk(req.session.user.id, {
      include: { all: true },
    });

    let validaciones = validationResult(req);
    let { errors } = validaciones;

    if (errors && errors.length > 0) {
      return res.render("./users/edit", {
        title: "Cava Wines-Edicion Usuario",
        styles: [
          "users/edit-mobile",
          "users/edit-tablet",
          "users/edit-desktop",
        ],
        errors: validaciones.mapped(),
        oldData: req.body,
        script: "editUser.js",
      });
    }

    //Actualización del usuario

    if (!req.body.fechaNacimiento) {
      req.body.fechaNacimiento = req.session.user.fechaNacimiento;
    }

    if (req.body.password != req.session.user.password) {
      req.body.password = hashSync(req.body.password, 10);
    }

    await oneUser.update({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      //email: req.body.email,       //No se debe actualizar el mail
      fechaNacimiento: req.body.fechaNacimiento,
      //avatar: req.body.avatar,     //No se debe actualizar aca, se actualiza el path
      password: req.body.password,
      //isAdmin: req.body.isAdmin,   //No se cambia el mail
    });

    //Actualización de imagenes

    let oneImage = await image.findByPk(oneUser.avatar, {
      include: { all: true },
    });

    if (req.files && req.files.length > 0) {
      await oneImage.update({
        path: req.files[0].filename,
      });
    }

    return res.redirect("/products/");
  },

  login: async (req, res) => {
    return res.render("./users/login", {
      title: "Cava Wines-Acceso",
      styles: [
        "users/login-mobile",
        "users/login-tablet",
        "users/login-desktop",
      ],
      script: "login.js",
    });
  },

  enter: async (req, res) => {
    let validaciones = validationResult(req);
    let { errors } = validaciones;

    if (errors && errors.length > 0) {
      return res.render("./users/login", {
        title: "Cava Wines-Acceso",
        styles: [
          "users/login-mobile",
          "users/login-tablet",
          "users/login-desktop",
        ],
        errors: validaciones.mapped(),
        oldData: req.body,
        script: "login.js",
      });
    }

    let oneUser = await user.findOne({
      include: { all: true },
      where: { email: req.body.email },
    });
    req.session.user = oneUser;
    req.session.ageCheck = true;

    if (req.body.recordame != undefined) {
      res.cookie("emailCookie", oneUser.email, { maxAge: 60000 });
    }

    return res.redirect("/");
  },

  logout: async (req, res) => {
    req.session.user = null;
    res.clearCookie("emailCookie");
    return res.redirect("/");
  },
};
