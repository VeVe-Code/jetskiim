const Jetskiis = require("../model/Jetskiis")
const { v2: cloudinary } = require("cloudinary");

let jetskiicontroller = {
    index: (req,res) => {
        return res.json({msg:"get all jetskii"})
    },
    // store: async (req,res) => {
    //     let {title, description, about, price } = req.body
    //     let uploadImages =  req.file.map(async (file) =>{
    //        let response= await cloudinary.uploader.upload(file.path)
    //        return response.secure_url
    //     })
    //    let images= await Promise.all(uploadImages)
    //     let reskii = await Jetskiis.create({
    //         title,
    //         description,
    //         about,
    //         price,
    //         images
    //     })
    //     return res.json(reskii)
    // }
    store: async (req, res) => {
    try {
        let { title, description, about, price } = req.body;

        // FIXED: req.file ❌ -> req.files ✔
        let uploadImages = req.files.map(async (file) => {
            let response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        });

        let images = await Promise.all(uploadImages);

        let reskii = await Jetskiis.create({
            title,
            description,
            about,
            price,
            images
        });

        return res.json(reskii);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "server error" });
    }
}

    ,
    show: (req,res) => {
        return res.json({msg:"show a jetskii "})
    },
    destory : (req,res) =>{
        return res.json({msg:"delete a jetskii"})
    },
       update : (req,res) =>{
        return res.json({msg:"update a jetskii"})
    }
    
}

module.exports = jetskiicontroller