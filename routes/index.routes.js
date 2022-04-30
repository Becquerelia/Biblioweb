// import needed modules
const router = require("express").Router();

// GET home page
router.get("/", (req, res, next) => {
  res.render("index");
});

// auth signup, login and logout routes
const authRoutes = require("./auth.routes.js");
router.use("/auth", authRoutes)

// all relative book routes like searching, details, etc.
const bookRoutes = require("./book.routes.js");
router.use("/books", bookRoutes)

// logged in user's profile routes
const profileRoutes = require("./profile.routes.js");
router.use("/profile", profileRoutes)

// logged in user's library routes
const myBooksRoutes = require("./library.routes.js");
router.use("/library", myBooksRoutes)

// other users routes
const usersRoutes = require("./user.routes.js")
router.use("/users", usersRoutes)

module.exports = router;
