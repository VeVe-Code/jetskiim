const express = require('express');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const { clerkMiddleware } = require('@clerk/express');
const cors = require('cors');
const mongoose = require('mongoose');

// Routes
const jetskiiRoute = require('./route/jetskii');
const userRoute = require('./route/user');
const bookingRouter = require('./route/booking');
const contactusRouter = require('./route/contactus');
const clertWebhooks = require('./controller/clerkWebhooks');
const connectCloudinary = require('./configs/cloudinary');

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// Cloudinary
connectCloudinary();

// Middleware
app.use('/api/clerk', express.raw({ type: '*/*' })); // Raw body for webhook
app.use(clerkMiddleware());
app.use(express.json());
app.use(morgan('dev'));

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://jetskiim-f.vercel.app'
  ],
  credentials: true
}));

// Routes
app.use('/api/clerk', clertWebhooks);         // webhook
app.use('/api/user', userRoute);              // user routes
app.use('/api/bookings', bookingRouter);
app.use('/api/jetskii', jetskiiRoute);
app.use('/api/contactus', contactusRouter);

// Root
app.get('/', (req, res) => {
  res.json({ msg: 'hello world' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
