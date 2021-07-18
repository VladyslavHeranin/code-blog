const { Router } = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth')
const Post = require('../models/Post')
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const config = require("config")


router.post("/createPosts",
    async (req, res) => {

        const { id, name, topik, discription } = req.body

        const currentId = await User.findOne({ _id: id })

        const posts = await Post.find();

        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        const date = mm + '/' + dd + '/' + yyyy;

        const post = new Post({ name, topik, discription, user: currentId.email, date })

        await post.save()

        currentId.followers.map(async (follower) => {

            const followers = await User.findOne({ _id: follower })

            await User.updateOne(followers, { $push: { 'subscribePosts': post._id } })

        })

        await User.updateOne(currentId, { $push: { 'postsId': post } })

        const user = await User.findOne({ _id: id })

        const page = await req.query.page
        const limit = await req.query.limit

        const startIndex = await (page - 1) * limit
        const endIndex = await page * limit

        const subPosts = posts.filter(item => user.subscribePosts.includes(item._id))

        const usersPosts = posts.filter(val => val.user === user.email);

        const postsConcat = subPosts.concat(usersPosts).sort(function (a, b) {
            return new Date(a.date) - new Date(b.date)
        });

        const reversePosts = postsConcat.reverse()

        const currentPosts = await reversePosts.slice(startIndex, endIndex)

        const lengthArr = postsConcat.length

        try {

            const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

            return res.json({
                'posts': currentPosts,
                token,
                user: {
                    role: user.role,
                    name: user.name,
                    lenght: lengthArr,
                    id: user.id,
                    email: user.email,
                    subscribe: user.subscribe,
                },
                message: `User criate new group ${name} `
            })

        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    })

router.get('/postsList', authMiddleware, async (req, res) => {

    const user = await User.findOne({ _id: req.user.id })

    const page = await req.query.page
    const limit = await req.query.limit

    const startIndex = await (page - 1) * limit
    const endIndex = await page * limit

    const posts = await Post.find();

    const postsConcat = posts.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date)
    });
    try {

        const resultAllPosts = postsConcat.reverse().slice(startIndex, endIndex)

        const postsAll = Math.ceil(posts.length / resultAllPosts.length)

        const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

        return res.json({
            search: [],
            posts: resultAllPosts,
            token,
            postsAll: postsAll,
            user: {
                role: user.role,
                name: user.name,
                id: user.id,
                email: user.email,
                files: user.files,
                followersItem: user.followersItem,
                subscribe: user.subscribe,
            },
        })

    } catch (e) {
        console.log(e)
        return res.status(400).json(e)
    }
})


router.post(`/followUser`,
    async (req, res) => {

        const { id, currentUserID, search } = req.body

        const currentUser = await User.findOne({ _id: currentUserID })

        const Item = await User.findOne({ _id: id })

        await User.updateOne(Item, { $push: { 'followers': currentUser.id } })

        await User.updateOne(currentUser, { $push: { 'subscribe': id } })

        const user = await User.findOne({ _id: currentUserID })

        const page = await req.query.page
        const limit = await req.query.limit

        const startIndex = await (page - 1) * limit
        const endIndex = await page * limit

        const users = await User.find()

        const resultUsers = users.slice(startIndex, endIndex)

        const userAll = Math.ceil(users.length / resultUsers.length)

        const posts = await Post.find();

        const usersPosts = posts.filter(val => val.user === user.email);

        try {

            const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

            return res.json({
                "users": resultUsers,
                "search": search,
                userAll: userAll,
                token,
                user: {
                    posts: usersPosts,
                    role: user.role,
                    id: user.id,
                    email: user.email,
                    followersItem: user.followersItem,
                    subscribe: user.subscribe,
                    followers: user.followers,
                    name: user.name,
                    hight: user.hight,
                    countries: user.countries,
                    birthday: user.birthday,
                    address: user.address,
                    files: user.files
                },
                message: `Now you follow ${Item.name}`
            })


        } catch (error) {

            res.send({ message: error })

        }
    }
)


router.post(`/unFollow`,
    async (req, res) => {

        const { id, currentUserID, search } = req.body

        const currentUser = await User.findOne({ _id: currentUserID })

        const Item = await User.findOne({ _id: id })

        const subRes = await currentUser.subscribe.filter(item => {
            return id !== item
        })

        await User.updateOne(currentUser, { 'subscribe': subRes })

        const result = Item.followers.filter(item => {
            return currentUser.id !== item
        })

        await User.updateOne(Item, { 'followers': result })

        const page = await req.query.page
        const limit = await req.query.limit


        const startIndex = await (page - 1) * limit
        const endIndex = await page * limit

        const users = await User.find()

        const user = await User.findOne({ _id: currentUserID })
        const resultUsers = users.slice(startIndex, endIndex)

        const userAll = Math.ceil(users.length / resultUsers.length)

        const posts = await Post.find();

        const usersPosts = posts.filter(val => val.user === user.email);

        try {

            const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

            return res.json({
                "users": resultUsers,
                "search": search,
                userAll: userAll,
                token,
                user: {
                    posts: usersPosts,
                    role: user.role,
                    id: user.id,
                    email: user.email,
                    followersItem: user.followersItem,
                    subscribe: user.subscribe,
                    name: user.name,
                    followers: user.followers,
                    hight: user.hight,
                    countries: user.countries,
                    birthday: user.birthday,
                    address: user.address,
                    files: user.files
                },
                message: `You unfollow ${Item.name}`
            })


        } catch (error) {

            res.send({ message: error })

        }
    }
)

module.exports = router