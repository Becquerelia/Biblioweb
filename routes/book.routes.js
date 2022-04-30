// import needed modules
const router = require("express").Router();
const axios = require("axios");
const { getBookInfoFromGoogleApiById, plainTextSearch } = require("../utils/basic-functions.js");

//! GET ROUTE - SEARCH BOOK
router.get("/", async (req, res, next) => {
  res.render("books/book-search.hbs");
});

//! POST ROUTE - SEARCH BOOK (RESULTS):
router.post("/", async (req, res, next) => {
  const { title, author } = req.body;

  // checks that user introduced params to search
  if (!title && !author) {
    res.render("books/book-search.hbs", {
      errorMessage: "Please fill at least one search field",
    });
    return;
  }

  try {
    // calls API with different params
    let bookFromAPI;
    if (!title) {
      bookFromAPI = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:"${plainTextSearch(author)}"&key=${process.env.APIKEY}`);
    } else if (!author) {
      bookFromAPI = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:"${plainTextSearch(title)}"&key=${process.env.APIKEY}`);
    } else {
      bookFromAPI = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:"${plainTextSearch(title)}"+inauthor:"${plainTextSearch(author)}"&key=${process.env.APIKEY}`);
    }

    // returns feedback to user if there are no results
    let mySearch = bookFromAPI.data.items;
    if (!mySearch) {
      res.render("books/book-search.hbs", {
        errorMessage: "No results, please search again",
      });
      return;
    }
    res.render("books/book-result.hbs", { mySearch });
  } catch (err) {
    next(err);
  }
});

//! GET ROUTE - BOOK DETAIL GET ROUTE:
router.get("/details/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    // calls getBookInfoFromGoogleApiById function from basic-functions.js
    // to retrieve needed book info
    const oneBookDetails = await getBookInfoFromGoogleApiById(id);
    res.render("books/book-detail.hbs", { oneBookDetails });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
