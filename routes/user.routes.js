// import needed modules
const router = require("express").Router();
const UserModel = require("../models/User.model.js");
const BookModel = require("../models/Book.model.js");

//! GET ROUTE - ALL USERS
router.get("/", async (req, res, next) => {
  try {
    const foundUser = await UserModel.find().sort({username:1});
    res.render("users/users.hbs", { foundUser });
  } catch (err) {
    next(err);
  }
});

//! GET ROUTE - VIEW OTHER USERS BY ID
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundUser = await UserModel.findById(id);
    const bookList = await BookModel.find({ ownerID: id }).sort({title:1});
    res.render("users/user-profile.hbs", { foundUser, bookList });
  } catch (err) {
    next(err);
  }
});

//! POST ROUTE - SEARCH USERS
router.post("/", async (req, res, next) => {
  const { searchUsername } = req.body;

  if (searchUsername.length < 2) {
    res.render("users/user-list.hbs", {
      errorMessage: "Please type at least two letters in the user searching field ",
    });
    return;
  }
  try {
    const userRegex = new RegExp(searchUsername, "ig");
    const searchedUser = await UserModel.find({ username: userRegex });
    if (searchedUser.length === 0) {
      res.render("users/user-list.hbs", {
        errorMessage: "There are no users with this username ",
      });
      return;
    }
    res.render("users/user-list.hbs", { searchedUser });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
