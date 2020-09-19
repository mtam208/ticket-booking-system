const MovieModel = require('../models/movie')

exports.homepage = (req, res, next) => {
    res.render('index')
}

