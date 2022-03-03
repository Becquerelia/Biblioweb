const router = require("express").Router();
const UserModel = require("../models/User.model.js")
const BookModel = require("../models/Book.model.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const { default: axios } = require("axios");
const { Router } = require("express");
const async = require("hbs/lib/async");
const uploader = require("../middlewares/uploader.js");


//! PRIVATE PROFILE ROUTE:

router.get("/", isLoggedIn, (req, res, next)=>{
    UserModel.findById(req.session.user._id)
    
    .then((user)=>{
        // console.log(req.session.user)
        // const actualUser = req.session.user
        // console.log(actualUser)
        res.render("profile/user-profile.hbs", {user})
    })
    .catch((err)=>{
        next(err)
    })        
})


//! UPDATE PROFILE PICTURE

router.post("/upload/profile-pic", uploader.single("image"), (req, res, next) => {
    const {image} = req.body


    if(!req.file){
        res.render("profile/user-profile.hbs", {
            errorMessage: "Please select a picture"
        })
        return;
      }

    UserModel.findByIdAndUpdate(req.session.user._id, {profilePic: req.file.path})
    .then(() => {
        
        res.redirect("/profile")
    })
    .catch((err) => {
        next(err)
    })
})

//! PROFILE/COLLECTIONS CREATE ROUTES:

router.get("/pending", isLoggedIn, async (req, res, next)=> {
    const {_id} = req.session.user
    try{
        const findBooks = await BookModel.find({status: "Pending", ownerID: _id})
        // console.log(findBooks);
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

//! UPDATE STATUS ROUTE
router.post("/:idBook/editToReading", async (req, res, next) => {
    const {idBook} = req.params
    try{
        const editBook = await BookModel.findByIdAndUpdate(idBook, {status: "Reading"})
        res.redirect("/profile/reading")
    }
    catch (err) {
        next(err)
    }
})

router.post("/:idBook/editToRead", async (req, res, next) => {
    const {idBook} = req.params
    try{
        const editBook = await BookModel.findByIdAndUpdate(idBook, {status: "Read"})
        
        res.redirect("/profile/read")
    }
    catch (err) {
        next(err)
    }
})


router.post("/:idBook/editToPending", async (req, res, next) => {
    const {idBook} = req.params
    try{
        const editBook = await BookModel.findByIdAndUpdate(idBook, {status: "Pending"})
        
        res.redirect("/profile/pending")
    }
    catch (err) {
        next(err)
    }
})

//! deleteBook ROUTE
router.post("/:idBook/deleteBook", async (req, res, next) => {
    const {idBook} = req.params
    try{
      const deleteBook = await BookModel.findByIdAndDelete(idBook)
      res.redirect("/profile")
    }
    catch (err) {
        next(err)
    }
})


//! DELETE USER ROUTE:

router.post("/delete", async (req, res, next) => {
    // console.log(req.param)
    try {
     
        await BookModel.deleteMany({ownerID: req.session.user._id})               
       
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