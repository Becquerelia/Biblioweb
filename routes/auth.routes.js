// import needed modules
const router = require("express").Router();
const BookModel = require("../models/Book.model.js");
const UserModel = require("../models/User.model.js");
const bcrypt = require("bcryptjs");
const isLoggedIn = require("../middlewares/isLoggedIn.js");

//! GET ROUTE - SIGN-UP
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

//! POST ROUTE - SIGN-UP
router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validation:

  if (!username || !email || !password) {
    res.render("auth/signup.hbs", {
      errorMessage: "You should fill up all fields",
    });
    return;
  }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
  if (!passwordRegex.test(password)) {
    res.render("auth/signup.hbs", {
      errorMessage: "Must contain between 8 and 15 characters, a number, a special character, upper and lower cases",
    });
    return;
  }

  try {
    const foundUsername = await UserModel.findOne({ username });
    if (foundUsername) {
      res.render("auth/signup.hbs", {
        errorMessage: "This username has already been registered",
      });
      return;
    }

    const foundEmail = await UserModel.findOne({ email });
    if (foundEmail) {
      res.render("auth/signup.hbs", {
        errorMessage: "This username has already been registered",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // User Creation:

    await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.redirect("/auth/login");
  } catch (err) {
    next(err);
  }
});

//! GET ROUTE - LOGIN
router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});

//! POST ROUTE - LOGIN
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render("auth/login.hbs", {
      errorMessage: "Please fill all fields",
    });
    return;
  }
  try {
    const foundUser = await UserModel.findOne({ username });

    if (!foundUser) {
      res.render("auth/login.hbs", {
        errorMessage: "User not registered",
      });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) {
      res.render("auth/login.hbs", {
        errorMessage: "Wrong password",
      });
      return;
    }
    req.session.user = foundUser;
    req.app.locals.isLoggedIn = true;
    res.redirect("/profile");
  } catch (err) {
    next(err);
  }
});

//! GET ROUTE - LOGOUT
router.get("/logout", (req, res, next) => {
  req.session.destroy();
  req.app.locals.isLoggedIn = false;
  res.redirect("/");
});

//! POST ROUTE - DELETE USER
router.post("/delete", isLoggedIn, async (req, res, next) => {
  try {
    await BookModel.deleteMany({ ownerID: req.session.user._id });
    await UserModel.findByIdAndDelete(req.session.user._id);
    req.session.destroy();
    req.app.locals.isLoggedIn = false;
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
