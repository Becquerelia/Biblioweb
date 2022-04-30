// Verifies if an user is logged in and allows
// access to restricted functionalities
const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};
module.exports = isLoggedIn;
