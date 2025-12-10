const { default: mongoose } = require("mongoose");
const Jetskiis = require("../model/Jetskiis")
const { v2: cloudinary } = require("cloudinary");

let jetskiicontroller = {
    index: async (req,res) => {
        let recipes = await Jetskiis.find().sort({createdAt : -1})
        return res.json(recipes)
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
    show: async (req,res) => {
     try {
           let id = req.params.id
           if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({msg: "id is invaid "})
           }
       let jetskii = await Jetskiis.findById(id)
       
         if(!jetskii){
            return res.status(404).json({msg: "not found jetskii"})
         }
        return res.json(jetskii)
     } catch (error) {
        return res.status(500).json({msg: "server error"})
     }
        },
    destory : async(req,res) =>{
          try {
           let id = req.params.id
           if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({msg: "id is invaid "})
           }
       let jetskii = await Jetskiis.findByIdAndDelete(id)
         if(!jetskii){
            return res.status(404).json({msg: "not found jetskii"})
         }
        return res.json(jetskii)
     } catch (error) {
        return res.status(500).json({msg: "server error"})
     }
    },
       update : async(req,res) =>{
          try {
           let id = req.params.id
           if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({msg: "id is invaid "})
           }
       let jetskii = await Jetskiis.findByIdAndUpdate(id,{
        ...req.body
       })
         if(!jetskii){
            return res.status(404).json({msg: "not found jetskii"})
         }
        return res.json(jetskii)
     } catch (error) {
        return res.status(500).json({msg: "server error"})
     }
    }
    ,
    toggleAvailability: async (req, res) => {
  try {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "id is invalid" });
    }

    let jetskii = await Jetskiis.findById(id);

    if (!jetskii) {
      return res.status(404).json({ msg: "jetskii not found" });
    }

    jetskii.isAvailable = !jetskii.isAvailable;
    await jetskii.save();

    return res.json({
      msg: "availability updated",
      isAvailable: jetskii.isAvailable
    });

  } catch (error) {
    return res.status(500).json({ msg: "server error" });
  }
},



    
}

module.exports = jetskiicontroller