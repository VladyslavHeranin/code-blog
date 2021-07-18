const { Schema, ObjectId, model } = require("mongoose")

const User = new Schema({
    password: {
        type: String,
        reguired: true,
    },
    role: {
        type: String,
        reguired: true,
    },
    email: {
        type: String,
        reguired: true,
        unique: true
    },
    name: {
        type: String,
        reguired: true,
    },
    hight: {
        type: String,
        reguired: false,
    },
    countries: {
        type: String,
        reguired: false,
    },
    birthday: {
        type: String,
        reguired: false,
    },
    address: {
        type: String,
        reguired: false,
    },
    postsId: [],
    subscribePosts: [],
    subscribe: [],
    followers: [],
})

module.exports = model("User", User)