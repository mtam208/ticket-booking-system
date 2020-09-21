const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true, unique: true}
    },
    {
        collection: 'user'
    }
);

userSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel