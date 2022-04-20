const router = require("express").Router();

const loginCheck = () => {
  return (req, res, next) => {
    // check for a logged in user
    if (req.session.user) {
      // if the user is logged in they can proceed as requested
      next()
    } else {
      res.redirect('/login')
    }
  }
}

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// here we add the loginCheck middleware
router.get('/profile', loginCheck(), (req, res, next) => {
  // this is how you can set a cookie
  res.cookie('myCookie', 'hello server')
  console.log('this is my cookie: ', req.cookies)
  // this is how you delete a cookie in the client browser
  // res.clearCookie('myCookie')
  const loggedInUser = req.session.user
  console.log(loggedInUser)
  res.render('profile', {user: loggedInUser })
});

module.exports = router;