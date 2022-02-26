const router = require("express").Router();
//const axios = require("axios")

const BookModel = require("../models/Book.model.js")


//! SEARCH BOOK GET ROUTE:

router.get("/", async (req, res, next) => {
    
    res.render("books/search.hbs")    
} )


//! SEARCH BOOK POST ROUTE (RESULTS):

router.get("/:id", async (req, res, next)=>{
    const {id} = req.params.id

    try{
        //Buscar libro en la base de datos:
    const bookFromDB = BookModel.findById(id)
    //Buscar libro en la API:
    const bookFromAPI = await axios.get(`apiUrl..${bookFromDB.apiID}`)
    //Renderizar vista:
    res.render("books/book-search.hbs") 

    }
    
    catch (err) {
        next(err)
    }
})

//! BOOK DETAIL GET ROUTE:

module.exports = router



