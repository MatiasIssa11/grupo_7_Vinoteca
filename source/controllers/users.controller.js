const { hashSync } = require("bcryptjs");
const { validationResult } = require("express-validator");
const { user } = require("../database/models/index");

module.exports = {
  register: async (req, res) => {
    return res.render("./users/register", {
      title: "Cava Wines-Registro",
      styles: [
        "users/register-mobile",
        "users/register-tablet",
        "users/register-desktop",
      ],
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
      });
    }

    req.body.password = hashSync(req.body.password, 10);
    req.body.isAdmin = String(req.body.email)
      .toLowerCase()
      .includes("@cavawines.com");

    req.body.avatar =
      req.files && req.files[0] ? req.files[0].filename : "default-user.svg"; // Levanta archivo del multer (el primero cargado)
    await user.create(req.body);

    return res.redirect("/users/login");
  },

  login: async (req, res) => {
    return res.render("./users/login", {
      title: "Cava Wines-Acceso",
      styles: [
        "users/login-mobile",
        "users/login-tablet",
        "users/login-desktop",
      ],
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
