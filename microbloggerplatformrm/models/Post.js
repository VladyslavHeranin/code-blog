const { model, Schema } = require('mongoose')


const Post = new Schema({
    name: { type: String, required: true },
    topik: { type: String, required: true },
    discription: { type: String, required: true },
    user: { type: String, required: true },
    date: { type: String, required: true },
})

module.exports = model('Post', Post)