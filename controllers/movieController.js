const MovieModel = require('../models/movie')

exports.homepage = (req, res, next) => {
    res.render('index')
}

exports.showingList = (req, res, next) => {
    MovieModel.find({
        _id: '5f66c766fb00db33d58d6ead'
    })
    .then(data=>{
        console.log(data[0].title);
    })
    .catch(err=>console.log(err))
}
