var express = require('express');
var router = express.Router();
var User = require('../models/user')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var session = require('express-session')

router.get('/login', function (req, res, next) {
  res.render('login');
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ 
        username: username,
        // password: password,
    })
      .then(data => {
        bcrypt.compare(password, data.password, (err, same) => {
          console.log(same);
          if (same) { return done(null,data)} else {return done(null, false)}
        })
      })
      .catch(err => {
        return done(err)
      });
  }
));

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) { return res.json(err) }
    if (!user) { return res.json('Fail') }
    var token = jwt.sign(user.id, 'mk');
    req.session.token = token;
    return res.json(token)
  })(req, res, next);
});

// Log Out
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/user')
})
  
// SIGNUP
router.get('/register', function (req, res) {
    res.render('signup')
})

router.post('/register', function (req, res) {
    let username = req.body.username;
    let email = req.body.email;
    let CheckAccount = true;
    User.find()
        .then(data => {
            for (i of data) { 
                if (username === i.username||email==i.email) { CheckAccount = false; break;}
            }
            if (!CheckAccount) {res.json(CheckAccount);} else {
            User.create(req.body)
            .then(data => {
                res.json(CheckAccount);
            })
            .catch(err => {
            res.json(err)
        })}
        })
    
})

// /* GET user info and booking history. */
// router.get('/:id', userController.userInfo);

// /* POST user login */
// router.post('/login', userController.userLogin);

// /* POST user register */
// router.post('/register', userController.userRegister);

// /* POST user logout */
// router.post('/logout', userController.userLogout);

// /* PATCH user change password */
// router.patch('/change-pwd', userController.userChangePwd);

module.exports = router;
