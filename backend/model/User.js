let mongoose = require('mongoose')

let Schema = mongoose.Schema

let UserSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "owner"],
        default: "user"
    }
}, { timestamps: true })

module.exports = mongoose.model("User", UserSchema)
