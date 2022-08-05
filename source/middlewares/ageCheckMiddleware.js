const ageCheckMiddleware = (req, res, next) => {
  return !req.session.ageCheck ? res.redirect("/agecheck") : next();
};

module.exports = ageCheckMiddleware;
