const { v2: cloudinary } = require("cloudinary");

let connectCoudinary = async () =>{
    cloudinary.config({
  cloud_name: process.env.CLOUDINARY_ClOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
}

module.exports = connectCoudinary 