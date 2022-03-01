const router = require("express").Router();
const axios = require("axios");

const BookModel = require("../models/Book.model.js");

//! SEARCH BOOK GET ROUTE:

router.get("/", async (req, res, next) => {
  res.render("books/book-search.hbs");
});

//! SEARCH BOOK POST ROUTE (RESULTS):

router.post("/", async (req, res, next) => {
  const { title } = req.body;

  if(!title){
    res.render("books/book-search.hbs", {
        errorMessage: "Please fill title field"
    })
    return;
  }

  try {
    const bookFromAPI = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:"${title}"&=${process.env.APIKEY}`
    );
    let mySearch = bookFromAPI.data.items;
    const filteredSearch = mySearch.filter((eachResult) => {
      const haveCoverImage = eachResult.volumeInfo.imageLinks;
      const apiISBN = eachResult.volumeInfo.industryIdentifiers[0].identifier

      if ( haveCoverImage !== undefined && apiISBN !== undefined) {
        //console.log(eachResult.volumeInfo.title);  
        return true
      }
    })
    

    //Renderizar vista:
    res.render("books/book-result.hbs", { filteredSearch });
  } catch (err) {
    next(err);
  }
});

//! BOOK DETAIL GET ROUTE:

router.get("/:isbn/details", async (req, res, next) => {
  const { isbn } = req.params;
  try{
    const oneBook = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&=${process.env.APIKEY}`
  )  

  const oneBookDetails = oneBook.data.items
  //console.log("isbn details", oneBookDetails)
  res.render("books/book-detail.hbs", {oneBookDetails})
  }
  catch (err) {
    next(err)
  }
  
  
});



module.exports = router;
