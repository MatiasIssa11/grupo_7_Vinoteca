const isLogged = (req, res, next) => {
  return !req.session.user ? res.redirect("/") : next();
};

module.exports = isLogged;
