// import needed modules
const router = require("express").Router();
const UserModel = require("../models/User.model.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const uploader = require("../middlewares/uploader.js");

//! GET USER PROFILE ROUTE
router.get("/", isLoggedIn, (req, res, next) => {
  UserModel.findById(req.session.user._id)
    .then((user) => {
      res.render("profile/user-profile.hbs", { user });
    })
    .catch((err) => {
      next(err);
    });
});

//! GET USER PROFILE EDIT ROUTE
router.get("/edit", isLoggedIn, async (req, res, next) => {
  try {
    const editUser = await UserModel.findById(req.session.user._id);
    res.render("profile/user-edit", { editUser });
  } catch (err) {
    next(err);
  }
});

//! POST USER PROFILE EDIT ROUTE
router.post("/edit", isLoggedIn, async (req, res, next) => {
  const id = req.session.user._id;

  const { username, email, about } = req.body;
  const editUser = { username, email, about };

  const loggedUserProfileInfo = await UserModel.findById(id);
  const loggedUserProfileUsername = loggedUserProfileInfo.username;
  const loggedUserProfileEmail = loggedUserProfileInfo.email;

  try {
    //* BACKEND VALIDATIONS

    // Check if both mandatory fields are filled
    if (!username || !email) {
      res.render("profile/user-edit", {
        editUser,
        errorMessage: "Username and email are mandatory! Please fill them both!",
      });
      return;
    }

    // Check if the new username provided by the user has already been registered
    if (username !== loggedUserProfileUsername) {
      const usernameRegistered = await UserModel.findOne({ username });

      if (usernameRegistered) {
        res.render("profile/user-edit", {
          editUser,
          errorMessage: "This username have already been registered!",
        });
        return;
      }
    }

    // Check if the new email provided by the user has already been registered
    if (email !== loggedUserProfileEmail) {
      const emailRegistered = await UserModel.findOne({ email });

      if (emailRegistered) {
        res.render("profile/user-edit", {
          editUser,
          errorMessage: "This email have already been registered!",
        });
        return;
      }
    }

    // If all verifications are ok, update user info
    await UserModel.findByIdAndUpdate(req.session.user._id, {
      username,
      email,
      about,
    });

    // redirect user to profile view page
    res.redirect(`/profile`);
  } catch (err) {
    next(err);
  }
});

//! POST USER PROFILE UPDATE PICTURE ROUTE
router.post("/upload/profile-pic", isLoggedIn, uploader.single("image"), async (req, res, next) => {
  if (!req.file) {
    const editUser = await UserModel.findById(req.session.user._id);
    res.render("profile/user-edit", {
      editUser,
      errorMessage: `No picture selected. Please, first choose a picture and after click "Add or change profile pic" button!`,
    });
    return;
  }

  UserModel.findByIdAndUpdate(req.session.user._id, {
    profilePic: req.file.path,
  })
    .then(() => {
      res.redirect(`/profile/edit`);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
