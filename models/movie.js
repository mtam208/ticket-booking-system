const mongoose = require('mongoose')

const Schema = mongoose.Schema

const movieSchema = new Schema(
    {
        title: {type: String, required: true},
        title_local: {type: String},
        rating: {type: String},
        length: {type: Number},
        country: {type: String},
        actor: {type: String},
        proceducer: {type: String},
        genre: {type: String},
        openDate: {type: Date},
        summary: {type: String},
        poster: {type: String},
        trailer: {type: String},
    }
)

const MovieModel = mongoose.model('movie', movieSchema)

module.exports = MovieModel