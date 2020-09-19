const MovieModel = require('../models/movie')

exports.homepage = (req, res, next) => {
    res.render('/index')
}

exports.showingList = (req, res, next) => {
    let showingList = []
    MovieModel.find({
        openDate: {$lt: Date.now()}
    })
    .then(data=>{
    })
}