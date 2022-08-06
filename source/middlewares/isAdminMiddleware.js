const isAdmin = (req, res, next) => {
  return req.session.user && req.session.user.category == "admin"
    ? next()
    : res.redirect("/");
};

module.exports = isAdmin;
