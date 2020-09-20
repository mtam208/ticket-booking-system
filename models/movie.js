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
        director: {type: String},
        producer: {type: String},
        genre: {type: String},
        openDate: {type: Date},
        summary: {type: String},
        poster: {type: String},
        trailer: {type: String},
    },
    {
        collection: 'movie'
    }
)

const MovieModel = mongoose.model('movies', movieSchema)

module.exports = MovieModel