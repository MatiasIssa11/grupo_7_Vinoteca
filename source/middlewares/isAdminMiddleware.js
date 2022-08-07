const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.category == "admin") {
    return next();
  } else {
    //alert("Solo accesible para administradores"); //Consultar como hacer que devuelva un mensaje
    return res.redirect("/");
  }
};

module.exports = isAdmin;
