const router = require("express").Router();
const UserModel = require("../models/User.model.js")
const BookModel = require("../models/Book.model.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const { default: axios } = require("axios");
const { Router } = require("express");
const async = require("hbs/lib/async");



//! SEARCH USERS ROUTE:

router.post("/", async (req, res, next) => {
    const {searchUsername} = req.body
    

    if(!searchUsername){
        res.render("other-users/user-list.hbs", {
            errorMessage: "Please fill the searching field "
        })
        return;
      }
    try{
        //Englobamos en una constante un Regex para que la búsqueda incluya más resultados (que no sea concordancia exacta)
        const userRegex = new RegExp(searchUsername, "ig")
        const searchedUser = await UserModel.find({ username :userRegex})
        if(searchedUser.length === 0 ){
            res.render("other-users/user-list.hbs", {
                errorMessage: "There are no users with this username "
            })
            return;
          }
        console.log(searchedUser)
        res.render("other-users/user-list.hbs", {searchedUser})
    }
    catch (err) {
        next(err)
    }    
})

//! CONSULT OTHER USER ROUTE:

router.get("/:id", async (req, res, next)=>{
    const {id} = req.params
    try {
        const foundUser = await UserModel.findById(id)
        res.render("other-users/other-user-profile.hbs", {foundUser})
    }
    catch (err) {
        next(err)
    }  
})





module.exports = router