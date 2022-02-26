const router = require("express").Router();


/* GET home page */
router.get("/", (req, res, next) => {

  res.render("index");
});

const userRoutes = require("./user.routes.js");
router.use("/user", userRoutes)

const bookRoutes = require("./book.routes.js");
router.use("/books", bookRoutes)

const profileRoutes = require("./profile.routes.js");
router.use("/profile", profileRoutes)

module.exports = router;
