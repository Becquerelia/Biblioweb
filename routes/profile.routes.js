const router = require("express").Router();
const UserModel = require("../models/User.model.js")
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