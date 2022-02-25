const router = require("express").Router();
const UserModel = require("../models/User.model.js")
const bcrypt = require("bcryptjs");

router.get("/signup", (req, res, next) => {
    res.render("users/signup.hbs")
} )

router.post("/signup", async (req, res, next) => {

    const {username, email, password} = req.body

    // Validacion
    if ( !username || !email || !password) {
        res.render("users/signup.hbs", {
           errorMessage: "You should fill up all fields"
        })
        return;
    }

    const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

  if (!passwordRegex.test(password)) {
    res.render("users/signup.hbs", {
      errorMessage:
        "Must contain between 8 and 15 characters, a number, a special character, upper and lower cases",
    });
    return;
  } 
  
  
  try {

    const foundUser = await UserModel.findOne({email})
    
    if (foundUser) {
        res.render("users/signup.hbs", {
            errorMessage:
              "This email is already registered",
          });
          return; 
    }

  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // crear usuario tras validacion

  await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });

  res.redirect("/users/login");
 }
 catch (err) {
    next(err)
 }

})

router.get("/login", (req, res, next) => {
    res.render("users/login.hbs")
})

router.post("/login", async (req, res, next) => {
    const {username, password} = req.body

    if(!username || !password){
        res.render("users/login.hbs", {
            errorMessage: "Please fill all fields"
        })
        return;
    }
    try{
        const foundUser = await UserModel.findOne({ username });

    if (!foundUser) {
        res.render("users/login.hbs", {
            errorMessage: "User not registered",
          });
          return;
    }
        const passwordMatch= await bcrypt.compare(password, foundUser.password)

        if(!passwordMatch) {
            res.render("users/login.hbs", {
                errorMessage: "Wrong password",
            })
            return;
        }

        req.session.user = foundUser

        req.app.locals.isLoggedIn = true

        res.redirect("/profile")

    }
    catch (err) {
        next(err)
    }
})

router.get("/logout", (req, res, next) => {
    req.session.destroy()
    req.app.locals.isLoggedIn = false
    res.redirect("/")
})

module.exports = router