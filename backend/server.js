let express = require('express')
require('dotenv').config()
let app = express()
let morgan = require('morgan')
let { clerkMiddleware } = require('@clerk/express')
var cors = require('cors')
let jetskiiRoute = require('./route/jetskii')
let userRoute = require('./route/user')
let mongoose = require('mongoose')
const clertWebhooks = require('./controller/clerkWebhooks')
let connectCoudinary = require('./configs/cloudinary')
const bookingRouter = require('./route/booking')
let contactusRouter = require('./route/contactus')
let mongoURL = process.env.MONGODB_URI 

mongoose.connect(mongoURL).then(() => {
    console.log('connected to db')
    app.listen(process.env.PORT, () => {
        console.log('server is running ' + process.env.PORT)
    })
})
connectCoudinary()

// RAW BODY → MUST BEFORE EVERYTHING
app.use('/api/clerk', express.raw({ type: "*/*" }))
app.use("/api", (req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private"
  );
  next();
});

app.use(clerkMiddleware())
app.use(express.json())
app.use(morgan('dev'))

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://jetskiim-f.vercel.app"
  ],
  credentials: true
}));

// ✅ Fixed: Webhook should be POST
app.post("/api/clerk", clertWebhooks)

// ✅ Keep only one /api/user route
app.use("/api/user", userRoute)

app.use('/api/contactus',contactusRouter)
app.get('/', (req, res) => {
    return res.json({ msg: "hello world" })
})

app.use('/api/bookings',bookingRouter)
app.use(jetskiiRoute)
