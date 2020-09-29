var jwt = require('jsonwebtoken');
var User = require('../models/user')

module.exports = function (req, res, next) {
  try {
    let result = req.user._id;
    console.log(result);
    User.findOne({
      _id:result,
    })
      .then(data => {
        console.log(data);
        if (!data) {res.json('KHONG HOP LE')}
        req.user = data.username;
        return next(); 
      })
      .catch(err => {
        return res.json(err)
      })
  } catch (error) {
    return res.json(error)
  }

  var token = req.session.token;
  if (token == undefined) { return res.json('KHONG HOP LE') };
  try {
    var result = jwt.verify(token, 'mk');
    User.findOne({
      _id:result,
    })
      .then(data => {
        if (!data) {res.json('KHONG HOP LE')}
        req.user = data.username;
        next(); 
      })
      .catch(err => {
        res.json(err)
      })
       
    } catch (error) {
      res.json(error)
    }
}
