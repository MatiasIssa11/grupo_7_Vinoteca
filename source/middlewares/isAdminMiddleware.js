const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.category == "admin") {
    return next();
  } else {
    window.alert("Solo accesible para administradores");
    return res.redirect("/");
  }
};

module.exports = isAdmin;
