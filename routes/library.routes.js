// import needed modules
const router = require("express").Router();
const BookModel = require("../models/Book.model.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const { getBookInfoFromGoogleApiById } = require("../utils/basic-functions.js");

//! GET ROUTE - SEARCH BOOK
router.get("/", async (req, res, next) => {
  res.render("library/library-view.hbs");
});

//! GET ROUTE - PROFILE/COLLECTIONS
router.get("/pending", isLoggedIn, async (req, res, next) => {
  const { _id } = req.session.user;
  try {
    const findBooks = await BookModel.find({ status: "pending", ownerID: _id }).sort({ title: 1 });
    res.render("library/pending.hbs", { findBooks });
  } catch (err) {
    next(err);
  }
});

router.get("/reading", isLoggedIn, async (req, res, next) => {
  const { _id } = req.session.user;
  try {
    const findBooks = await BookModel.find({ status: "reading", ownerID: _id }).sort({ title: 1 });
    res.render("library/reading.hbs", { findBooks });
  } catch (err) {
    next(err);
  }
});

router.get("/read", isLoggedIn, async (req, res, next) => {
  const { _id } = req.session.user;
  try {
    const findBooks = await BookModel.find({ status: "read", ownerID: _id }).sort({ title: 1 });
    res.render("library/read.hbs", { findBooks });
  } catch (err) {
    next(err);
  }
});

//! POST ROUTE - UPDATE BOOK READING STATUS
router.post("/moveToReading/:idBook", isLoggedIn, async (req, res, next) => {
  const { idBook } = req.params;
  try {
    await BookModel.findByIdAndUpdate(idBook, {
      status: "reading",
    });

    // redirects to the category where the book was moved 
    // res.redirect("/library/reading");

    // redirects back to the page from where the query was made
    res.redirect("back");
  } catch (err) {
    next(err);
  }
});

router.post("/moveToRead/:idBook", isLoggedIn, async (req, res, next) => {
  const { idBook } = req.params;
  try {
    await BookModel.findByIdAndUpdate(idBook, {
      status: "read",
    });

    // redirects to the category where the book was moved 
    res.redirect("/library/read");

    // redirects back to the page from where the query was made
    res.redirect("back");
  } catch (err) {
    next(err);
  }
});

router.post("/moveToPending/:idBook", isLoggedIn, async (req, res, next) => {
  const { idBook } = req.params;
  try {
    await BookModel.findByIdAndUpdate(idBook, {
      status: "pending",
    });

    // redirects to the category where the book was moved 
    // res.redirect("/library/pending");

    // redirects back to the page from where the query was made
    res.redirect("back");
  } catch (err) {
    next(err);
  }
});

//! POST ROUTE - DELETE BOOK
router.post("/deleteBook/:idBook", isLoggedIn, async (req, res, next) => {
  const { idBook } = req.params;
  try {
    await BookModel.findByIdAndDelete(idBook);

    // redirects back to user's library
    // res.redirect("/library");

    // redirects back to the page from where the query was made
    res.redirect("back");
  } catch (err) {
    next(err);
  }

});

//! POST ROUTE - ADD BOOK TO USER'S LIST
router.post("/:status/:id", isLoggedIn, async (req, res, next) => {
  const { status, id } = req.params;
  let readingStatus = "";
  switch (status) {
    case "pending":
      readingStatus = "pending";
      break;
    case "reading":
      readingStatus = "reading";
      break;
    case "read":
      readingStatus = "read";
      break;
  }

  try {
    // calls getBookInfoFromGoogleApiById function from basic-functions.js
    // to retrieve needed book info
    const oneBookDetails = await getBookInfoFromGoogleApiById(id);
    let imageThumbLink;

    if (oneBookDetails.imageLinks) {
      if (oneBookDetails.imageLinks.smallThumbnail) {
        imageThumbLink = oneBookDetails.imageLinks.smallThumbnail;
      } else if (oneBookDetails.imageLinks.thumbnail) {
        imageThumbLink = oneBookDetails.imageLinks.thumbnail;
      }
    }

    await BookModel.create({
      apiID: oneBookDetails.id,
      title: oneBookDetails.title,
      coverLink: imageThumbLink,
      ownerID: req.session.user._id,
      status: readingStatus,
      review: "",
    });
    // redirects back to search book page
    res.redirect("back");

    // redirects back to the page from where the query was made
    // res.redirect(req.rawHeaders[31]);
    return;
  } catch (err) {
    next(err);
  }
});

module.exports = router;
