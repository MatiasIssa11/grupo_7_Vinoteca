const { user } = require("../database/models/index");

const users = async (req, res, next) => {
  let userSession = null;
  let users = await user.findAll();

  let emailCookie = req.cookies.emailCookie;
  let userCookie = users.find((u) => u.email === emailCookie);

  if (userCookie) {
    req.session.user = userCookie;
    req.session.ageCheck = true;
  }

  if (req.session && req.session.user) {
    userSession = req.session.user;
  }

  res.locals.user = userSession;

  return next();
};

module.exports = users;
