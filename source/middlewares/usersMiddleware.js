const { user } = require("../database/models/index");

const users = async (req, res, next) => {
  let user = null;
  let users = await user.findAll();

  let emailCookie = req.cookies.emailCookie;
  let userCookie = users.find((u) => u.email === emailCookie);

  if (userCookie) {
    req.session.user = userCookie;
    req.session.ageCheck = true;
  }

  if (req.session && req.session.user) {
    user = req.session.user;
  }

  res.locals.user = user;

  return next();
};

module.exports = users;
