const MovieModel = require('../models/movie')
const SessionModel = require('../models/sess')

exports.homepage = (req, res, next) => {
    res.render('index')
}

exports.showingList = (req, res, next) => {
    let today = new Date()
    MovieModel.find({
        openDate: {$lte: today}
    })
    .sort({openDate: -1})
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
    .sort({openDate: 1})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>console.log(err))
}

exports.movieInfo = (req, res, next) => {
    MovieModel.findById(req.params.id)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>console.log(err))
}

exports.cinemaList = (req, res, next) => {
    SessionModel.find({
        movie: req.params.movieId
    })
    .then(data=>{
        let fullList = data.map(session => session.cinema)
        let uniqueList = Array.from(new Set(fullList))
        res.json(uniqueList)
    })
    .catch(err=>console.log(err))
}

exports.showDateList = (req, res, next) => {
    SessionModel.find({
        movie: req.params.movieId,
        cinema: decodeURI(req.params.cinemaId)
    })
    .then(data=>{
        let fullList = data.map(session => session.showDate)
        let uniqueList = Array.from(new Set(fullList))
        res.json(uniqueList)
    })
    .catch(err=>console.log(err))
}

exports.showTimeList = (req, res, next) => {
    console.log(req.params.showDateId);
    SessionModel.find({
        movie: req.params.movieId,
        cinema: decodeURI(req.params.cinemaId),
        showDate: req.params.showDateId
    })
    .then(data=>{
        let fullList = data.map(session => session.showTime)
        let uniqueList = Array.from(new Set(fullList))
        res.json(uniqueList)
    })
    .catch(err=>console.log(err))
}