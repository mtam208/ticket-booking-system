var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function (req, res) {
  User.find()
    .then(data => {
        res.json(data)
    })
})

module.exports = router;