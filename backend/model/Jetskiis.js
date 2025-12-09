let mongoose = require('mongoose')

let Schema = mongoose.Schema

let JetskiiSchema = new Schema(
    {
        title:{
          type: String,
          required : true
        },
        description:{
            type:String,
            required: true
        },
        about:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        images:[{
            type:String,
            required:true
        }],
        isAvailable:{
            type:Boolean,
            default:true
        }
    },{timestamps: true}
)

module.exports = mongoose.model("jetskiis", JetskiiSchema)