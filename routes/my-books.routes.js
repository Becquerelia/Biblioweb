const router = require("express").Router();
const axios = require("axios");
const BookModel = require("../models/Book.model.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js")

//! ADD BOOK TO PENDING LIST ROUTE:

router.post("/:isbn/:title/pending", isLoggedIn, async (req, res, next) => {
  
  const { isbn, title } = req.params;
  try {
    const addPendingBook = await BookModel.create({
      apiISBN: isbn,
      title: title,
      ownerID: req.session.user._id,
      status: "Pending",
      review: "",
    });
    res.redirect("/books")
  } catch (err) {
    next(err);
  }
});

//! ADD BOOK TO READING LIST ROUTE:

router.post("/:isbn/:title/reading", isLoggedIn, async (req, res, next) => {
 
  const { isbn, title } = req.params;
  try {
    const addPendingBook = await BookModel.create({
      apiISBN: isbn,
      title: title,
      ownerID: req.session.user._id,
      status: "Reading",
      review: "",
    });
    res.redirect("/books")
  } catch (err) {
    next(err);
  }
});

//! ADD BOOK TO READ LIST ROUTE:

router.post("/:isbn/:title/read", isLoggedIn, async (req, res, next) => {

  const { isbn, title } = req.params;
  try {
    const addPendingBook = await BookModel.create({
      apiISBN: isbn,
      title: title,
      ownerID: req.session.user._id,
      status: "Read",
      review: "",
    });
    res.redirect("/books")
  } catch (err) {
    next(err);
  }
});



module.exports = router;
