const router = require("express").Router();
//const axios = require("axios")

const BookModel = require("../models/Book.model.js")


//! SEARCH BOOK GET ROUTE:

router.get("/", async (req, res, next) => {
    
    res.render("books/book-search.hbs")    
} )


//! SEARCH BOOK POST ROUTE (RESULTS):

router.post("/", async (req, res, next)=>{
    const {title} = req.body.title
    
    try{        
        const bookFromDB = BookModel.findById(id)
        //Buscar libro en la API:
        
        //const bookFromAPI = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookFromDB.apiID}&key=${process.env.APIKEY}`, {
            //params: `intitle:${req.body.title}`})
            console.log(bookFromAPI)
        //Renderizar vista:
        res.render("books/book-search.hbs") 
    }
    
    catch (err) {
        next(err)
    }
})

//! BOOK DETAIL GET ROUTE:

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

module.exports = router



