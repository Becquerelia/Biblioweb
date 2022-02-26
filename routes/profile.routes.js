const router = require("express").Router();
const UserModel = require("../models/User.model.js")
const isLoggedIn = require("../middlewares/isLoggedIn.js")


//! PRIVATE PROFILE ROUTE:

router.get("/", isLoggedIn, (req, res, next)=>{
    UserModel.findById(req.session.user._id)
    .then((user)=>{
        res.render("profile/user-profile.hbs", {user})
    })
    .catch((err)=>{
        next(err)
    })        
})


module.exports = router;