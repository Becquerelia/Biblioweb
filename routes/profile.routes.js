const router = require("express").Router();
const UserModel = require("../models/User.model.js")
const BookModel = require("../models/Book.model.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js")


//! PRIVATE PROFILE ROUTE:

router.get("/", isLoggedIn, (req, res, next)=>{
    UserModel.findById(req.session.user._id)
    
    .then((user)=>{
        console.log(req.session.user)
        const actualUser = req.session.user
        console.log(actualUser)
        res.render("profile/user-profile.hbs", {actualUser})
    })
    .catch((err)=>{
        next(err)
    })        
})

//! PROFILE/COLLECTIONS ROUTES:

router.get("/pending", isLoggedIn, async (req, res, next)=> {
    const {_id} = req.session.user
    try{
        const findBooks = await BookModel.find({status: "Pending", ownerID: _id})
        //const pendingBooks = findBooks.filter((eachBook)=>{
          //  if (eachBook.ownerID === _id) {
            //    return true
            //}
        //})        
        res.render("profile/pending.hbs", {findBooks})
    }
    catch (err) {
        next(err)
    }
})

router.get("/reading", isLoggedIn, async (req, res, next)=> {
    const {_id} = req.session.user
    try{
        const findBooks = await BookModel.find({status: "Reading", ownerID: _id})
        res.render("profile/reading.hbs", {findBooks})
    }
    catch (err) {
        next(err)
    }
})

router.get("/read", isLoggedIn, async (req, res, next)=> {
    const {_id} = req.session.user
    try{
        const findBooks = await BookModel.find({status: "Read", ownerID: _id})
        res.render("profile/read.hbs", {findBooks})
        
    }
    catch (err) {
        next(err)
    }
})


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




//! Delete user
router.post("/delete", async (req, res, next) => {
    // console.log(req.param)
    try {
        await UserModel.findByIdAndDelete(req.session.user._id)
        req.session.destroy()
        req.app.locals.isLoggedIn = false
        res.redirect("/")
        }
    catch (err) {
        next(err)
    }
})



module.exports = router;