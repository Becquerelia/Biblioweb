const router = require("express").Router();
const BookModel = require("../models/Book.model.js")
//const axios = require("axios")

//! BOOK LIST ROUTE:

router.get("/", (req, res, next) => {
    //Buscar los títulos de cada libro en la API
    res.render("books/book-list.hbs")    
} )

//! DETAIL BOOK ROUTE:

router.get("/:id", async (req, res, next)=>{
    const {id} = req.params.id
    //Buscar libro en la base de datos:
    const bookFromDB = BookModel.findById(id)
    //Buscar libro en la API:
    const bookFromAPI = await axios.get(`apiUrl..${bookFromDB.apiID}`)
    //Renderizar vista:
    res.render("books/book-detail.hbs") 
})

module.exports = router



