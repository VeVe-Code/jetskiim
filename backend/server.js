let express = require('express')
require('dotenv').config()
let app = express()

app.use(express.json())  // IMPORTANT

let morgan = require('morgan')
let { clerkMiddleware } = require('@clerk/express')
var cors = require('cors')
let jetskiiRoute = require('./route/jetskii')
let mongoose = require('mongoose')
const clertWebhooks = require('./controller/clerkWebhooks')

let mongoURL = process.env.MONGODB_URI 

mongoose.connect(mongoURL).then(() => {
    console.log('connected to db')
    app.listen(process.env.PORT, () => {
        console.log('server is running ' + process.env.PORT)
    })
})

app.use(clerkMiddleware())
app.use(morgan('dev'))

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/clerk", clertWebhooks)

app.get('/', (req, res) => {
    return res.json({ msg: "hello world" })
})

app.use(jetskiiRoute)
