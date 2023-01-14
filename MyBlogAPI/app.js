const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT

const { connectToMongoDB } = require('./config/db')

const authRoute = require("./routes/auth.route")
const postRoute = require("./routes/posts.route")
const publishedPostRoute = require("./routes/publishedPosts.route")

// connection to database
connectToMongoDB()

// middleware
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
app.use("/api/publishedPosts", publishedPostRoute)


app.listen(PORT, () => {
    console.log(`Server is running at port http://localhost:${PORT}`)
})