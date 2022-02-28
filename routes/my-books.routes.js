const router = require("express").Router();
const axios = require("axios");
const BookModel = require("../models/Book.model.js");

// llevar my-books a index
router.post("/:isbn/:title/pending", async (req, res, next) => {
  //? Qué info para llenar el libro
  //? Qué info tenemos
  //TODO Create book
  const { isbn, title } = req.params;
  try {
    const addPendingBook = await BookModel.create({
      apiISBN: isbn,
      title: title,
      status: "Pending",
      review: "",
    });
    res.redirect("/books")
  } catch (err) {
    next(err);
  }
});

router.post("/:isbn/:title/reading", async (req, res, next) => {
  //? Qué info para llenar el libro
  //? Qué info tenemos
  //TODO Create book
  const { isbn, title } = req.params;
  try {
    const addPendingBook = await BookModel.create({
      apiISBN: isbn,
      title: title,
      status: "Reading",
      review: "",
    });
    res.redirect("/books")
  } catch (err) {
    next(err);
  }
});

router.post("/:isbn/:title/read", async (req, res, next) => {
  //? Qué info para llenar el libro
  //? Qué info tenemos
  //TODO Create book
  const { isbn, title } = req.params;
  try {
    const addPendingBook = await BookModel.create({
      apiISBN: isbn,
      title: title,
      status: "Read",
      review: "",
    });
    res.redirect("/books")
  } catch (err) {
    next(err);
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
