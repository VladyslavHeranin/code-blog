const express = require(`express`)
const config = require("config")
const mongoose = require(`mongoose`)
const app = express()
const cors = require("./middleware/cors.js")
const authRouter = require("./routes/auth.routes")
const postsRouter = require("./routes/posts.routes")
const PORT = process.env.PORT || 8080
require("dotenv").config()
// const cors = require("cors")



app.use(cors)
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/post", postsRouter)


if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'))
}


const start = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URL || config.get("url"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        app.listen(PORT, () => console.log(`app is  port ${PORT}`))

    } catch (error) {

        console.log("error", error)

    }
}

start()














