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

  try {
    const bookFromAPI = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:"${title}"&=${process.env.APIKEY}`
    );
    let mySearch = bookFromAPI.data.items;
    const filteredSearch = mySearch.filter((eachResult) => {
         const haveCoverImage = eachResult.volumeInfo.imageLinks;
      if ( haveCoverImage !== undefined) {
        console.log(eachResult.volumeInfo.title);  
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
    `https://www.googleapis.com/books/v1/volumes?q=isbn:"${isbn}"&=${process.env.APIKEY}`
  )  
  res.render("books/book-detail.hbs")
  }
  catch (err) {
    next(err)
  }
  
  
});

//router.post("/", async (req, res, next)=>{
//const {id} = req.params.id

//try{
//Buscar libro en la base de datos:
//const bookFromDB = BookModel.findById(id)
//Buscar libro en la API:
//const bookFromAPI = await axios.get(`apiUrl..${bookFromDB.apiID}`)
//Renderizar vista:
//res.render("books/book-search.hbs")

//}

//catch (err) {
//    next(err)
//}
//})

module.exports = router;
