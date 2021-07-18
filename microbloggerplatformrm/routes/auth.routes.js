const { Router } = require("express")
const User = require("../models/User")
const router = new Router()
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const Post = require("../models/Post")
const { check, validationResult } = require("express-validator")
const authMiddleware = require("../middleware/auth")

router.post("/registration",
    [
        check("email", "некоректный email").isEmail(),
        check("password", "минимум 6 символов").isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {
            const {
                email,
                password,
                name,
                role,
                hight,
                countries,
                birthday,
                address } = req.body

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: " please write down the correct entry: e-mail, name, password",
                    error
                })
            }

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: `user with email ${email} already exist` })
            }

            const hashedPassword = await bcrypt.hash(password, 7)

            const user = new User({
                name,
                email,
                password: hashedPassword,
                role,
                hight,
                countries,
                birthday,
                address
            })

            await user.save()

            return res.json({ message: "User was created" })

        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    })




router.post("/login",
    async (req, res) => {

        const { email, password } = req.body

        try {

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(404).json({ message: "user not found" })
            }

            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({ message: "Invalid password" })
            }


            const posts = await Post.find();

            const subPosts = posts.filter(item => user.subscribePosts.includes(item._id))

            const usersPosts = posts.filter(val => val.user === user.email);

            const currentPosts = subPosts.concat(usersPosts).sort(function (a, b) {
                return new Date(a.date) - new Date(b.date)
            });

            const reversePosts = currentPosts.reverse()

            const lengthArr = currentPosts.length


            const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

                return res.json({
                    token,
                    posts: reversePosts,
                    user: {
                        id: user.id,
                        email: user.email,
                        length: lengthArr,
                        name: user.name,
                        files: user.files,
                        followersItem: user.followersItem,
                        subscribe: user.subscribe,
                        role: user.role,
                    },
                    message: `Welcome  ${user.name} to Micro-blog platform`
                })

        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    }
)




router.post(`/delItem`,
    async (req, res) => {

        const { id, currentId } = req.body

        const user = await User.findOne({ _id: currentId })

        const Item = await User.findOne({ _id: id })

        await Item.remove()

        const page = await req.query.page
        const limit = await req.query.limit

        const startIndex = await (page - 1) * limit
        const endIndex = await page * limit

        const users = await User.find()

        const resultUsers = users.slice(startIndex, endIndex)

        const userAll = Math.ceil(users.length / resultUsers.length)


        try {
            const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

            return res.json({
                "search": [],
                "users": resultUsers,
                userAll: userAll,
                token,
                user: {
                    role: user.role,
                    id: user.id,
                    email: user.email,
                    followersItem: user.followersItem,
                    subscribe: user.subscribe,
                    name: user.name,
                    hight: user.hight,
                    countries: user.countries,
                    birthday: user.birthday,
                    address: user.address
                },
                message: "User is delete"
            })


        } catch (error) {

            res.send({ message: error })

        }
    }
)


router.get("/auth", authMiddleware,
    async (req, res) => {

        const user = await User.findOne({ _id: req.user.id })

        const posts = await Post.find();

        const users = await User.find()

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
                    posts: currentPosts,
                    token,
                    user: {
                        role: user.role,
                        lenght: lengthArr,
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        postsId: users.postsId,
                        subscribe: user.subscribe,
                        files: user.files,
                    },
                    message: "page was update"
                })

        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    })




router.get("/users", authMiddleware,
    async (req, res) => {

        const user = await User.findOne({ _id: req.user.id })

        const page = await req.query.page
        const limit = await req.query.limit

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        try {

            const users = await User.find();

            const resultUsers = users.slice(startIndex, endIndex)

            const userAll = Math.ceil(users.length / resultUsers.length)

            const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

            return res.json({
                search: [],
                users: resultUsers,
                userAll: userAll,
                token,
                user: {
                    role: user.role,
                    id: user.id,
                    email: user.email,
                    followersItem: user.followersItem,
                    subscribe: user.subscribe,
                    name: user.name,
                    hight: user.hight,
                    countries: user.countries,
                    birthday: user.birthday,
                    address: user.address,
                }
            })

        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    })




router.post("/update",
    async (req, res) => {

        const { name, role, currentId, id, search } = req.body

        const changUser = await User.findOne({ _id: id })

        await User.updateOne(changUser, { name: name, role: role })

        const page = await req.query.page
        const limit = await req.query.limit

        const startIndex = await (page - 1) * limit
        const endIndex = await page * limit

        const users = await User.find();
        const resultUsers = users.slice(startIndex, endIndex)

        const userAll = Math.ceil(users.length / resultUsers.length)

        const user = await User.findOne({ email: currentId })
        const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

        try {

            return res.json({
                "users": resultUsers,
                "search": search,
                userAll: userAll,
                token,
                user: {
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
                message: "The user is updated to see the changes, you need to refresh the page"
            })

        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    }
)




router.delete("/delete", authMiddleware,
    async (req, res) => {

        const user = await User.findOne({ _id: req.user.id })

        try {

            await user.remove()
            return res.json({ message: "User is delete" })

        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }

    })


router.post("/search",

    async (req, res) => {

        const { value, state, id } = req.body

        const currentId = await User.findOne({ _id: id })

        const users = await User.find()

        const posts = await Post.find();

        const currentList = (current) => {

            const searchArr = []

            current.map(item => {

                if (item.name.search(value) !== -1) {
                    return searchArr.push(item)
                }
            })
            return searchArr
        }
        const postsConcat = posts.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date)
        });

        const reversePostsList = postsConcat.reverse()



        const page = await req.query.page
        const limit = await req.query.limit

        const startIndex = await (page - 1) * limit
        const endIndex = await page * limit

        try {

            const resultAllPosts = reversePostsList.slice(startIndex, endIndex)

            const resultUsers = users.slice(startIndex, endIndex)

            const userAll = Math.ceil(users.length / 3)

            const postsAll = Math.ceil(posts.length / 3)


            const token = jwt.sign({ id: currentId.id }, config.get("key"), { expiresIn: "1h" })

            const user = await User.findOne({ _id: id })

            if (state === "list") {
                return res.json({
                    search: currentList(users),
                    users: resultUsers,
                    userAll: userAll,
                    token,
                    user: {
                        role: user.role,
                        id: user.id,
                        email: user.email,
                        followersItem: user.followersItem,
                        subscribe: user.subscribe,
                        name: user.name,
                        hight: user.hight,
                        countries: user.countries,
                        birthday: user.birthday,
                        address: user.address,
                        files: user.files
                    },
                    message: `${currentList(users).length} users have a search snippet in their email`
                })
            } if (state === "groups") {

                return res.json({
                    search: currentList(posts),
                    posts: resultAllPosts,
                    postsAll: postsAll,
                    token,
                    user: {
                        role: user.role,
                        name: user.name,
                        id: user.id,
                        email: user.email,
                        subscribe: user.subscribe,
                        followersItem: user.followersItem,
                    },
                    message: `${currentList(posts).length} users have a search snippet in their `
                })
            }
        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    })




router.post("/updateName",

    async (req, res) => {

        const { id, name } = req.body

        const currentId = await User.findOne({ _id: id })

        try {

            const token = jwt.sign({ id: currentId.id }, config.get("key"), { expiresIn: "1h" })

            await User.updateOne(currentId, { name: name })

            const user = await User.findOne({ _id: id })

            const posts = await Post.find();

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

            return res.json({
                posts: currentPosts,
                token,
                user: {
                    role: user.role,
                    name: user.name,
                    lenght: lengthArr,
                    id: user.id,
                    email: user.email,
                    subscribe: user.subscribe,
                },
                message: `User was rename ${user.name} `
            })

        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    })


module.exports = router

