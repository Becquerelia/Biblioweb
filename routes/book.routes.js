const router = require("express").Router();
const axios = require("axios");
const BookModel = require("../models/Book.model.js");

//! SEARCH BOOK GET ROUTE:
router.get("/", async (req, res, next) => {
  res.render("books/book-search.hbs");
});

//! SEARCH BOOK POST ROUTE (RESULTS):
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
      bookFromAPI = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=inauthor:"${author}"&key=${process.env.APIKEY}`
      );
    } else if (!author) {
      bookFromAPI = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:"${title}"`
      );
    } else {
      bookFromAPI = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:"${title}"+inauthor:"${author}"&key=${process.env.APIKEY}`
      );
    }

    // returns feedback to user if there are no results
    let mySearch = bookFromAPI.data.items;
    if (!mySearch) {
      res.render("books/book-search.hbs", {
        errorMessage: "No results, please search again",
      });
      return;
    }

    // filters results and display only the ones with cover and ISBN
    const filteredSearch = mySearch.filter((eachResult) => {
      const haveCoverImage = eachResult.volumeInfo.imageLinks;
      const apiISBN = eachResult.volumeInfo.industryIdentifiers[0].identifier;
      if (haveCoverImage !== undefined && apiISBN !== undefined) {
        return true;
      }
    });

    // render a page if after filtering there are no results to show
    // someone will remember how tricky was dealing with this error ;-)
    if (filteredSearch.length > 0) {
      res.render("books/book-result.hbs", { filteredSearch });
    } else {
      res.render("books/book-search.hbs", {
        errorMessage:
          "There are no results with your search criteria and our filter policy. Please try again with different parameters.",
      });
      return;
    }
  } catch (err) {
    next(err);
  }
});

//! BOOK DETAIL GET ROUTE:
router.get("/:isbn/details", async (req, res, next) => {
  const { isbn } = req.params;
  try {
    const oneBook = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&=${process.env.APIKEY}`
    );

    const oneBookDetails = oneBook.data.items;
    res.render("books/book-detail.hbs", { oneBookDetails });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
