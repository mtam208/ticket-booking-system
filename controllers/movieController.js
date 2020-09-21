const MovieModel = require('../models/movie')

exports.homepage = (req, res, next) => {
    res.render('index')
}

exports.showingList = (req, res, next) => {
    let today = new Date()
    MovieModel.find({
        openDate: {$lte: today}
    })
    .then(data=>{
        res.json(data);
    })
    .catch(err=>console.log(err))
}

exports.upcomingList = (req, res, next) => {
    let today = new Date()
    MovieModel.find({
        openDate: {$gt: today}
    })
    .then(data=>{
        res.json(data);
    })
    .catch(err=>console.log(err))
}