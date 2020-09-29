var jwt = require('jsonwebtoken');
var User = require('../models/user')

module.exports = function (req, res, next) {
  var token = req.session.token;
  if (token == undefined&&req.user==undefined) {return res.json('KHONG HOP LE') };
  try {
    if (token==undefined) { result = req.user._id} else {
    var result = jwt.verify(token, 'mk')};
    User.findOne({
      _id:result,
    })
      .then(data => {
        if (!data) { res.json('KHONG HOP LE') };
        if (data.username == null) { req.user = data.email }
        else {req.user = data.username};
        next(); 
      })
      .catch(err => {
        res.json(err)
      })
       
    } catch (error) {
      res.json(error)
    }
}
