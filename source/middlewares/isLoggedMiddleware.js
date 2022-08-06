const isLogged = (req, res, next) => {
  return !req.session.user ? res.redirect("/users/login") : next();
};

module.exports = isLogged;
