const MovieModel = require('../models/movie')

exports.homepage = (req, res, next) => {
    res.render('index')
}

exports.showingList = (req, res, next) => {
    // let now = new Date()
    MovieModel.findById('5f66c766fb00db33d58d6ead')
    .then(data=>{
        console.log(data);
    })
    .catch(err=>console.log(err))
}
