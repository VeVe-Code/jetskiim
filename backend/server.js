let express = require('express')
require('dotenv').config()
let app = express()
let morgan = require('morgan')
let { clerkMiddleware } = require('@clerk/express')
var cors = require('cors')
let jetskiiRoute = require('./route/jetskii')
let mongoose = require('mongoose')
const clertWebhooks = require('./controller/clerkWebhooks')
let mongoURL = 'mongodb+srv://kzt2288330022_db_user:test1234@cluster0.vm3bqh9.mongodb.net/?appName=Cluster0'
mongoose.connect(mongoURL).then(() => {
    console.log('connected to db')
    app.listen(process.env.PORT,()=>{
    console.log('server is running' + process.env.PORT)
})
})
app.use(clerkMiddleware())
app.use(morgan('dev'))

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/clerk", clertWebhooks)

app.get('/',(req,res)=>{
    return res.json({msg:"hello world"})
})

app.use(jetskiiRoute)

