const { default: mongoose } = require("mongoose");
const Jetskiis = require("../model/Jetskiis")
const { v2: cloudinary } = require("cloudinary");

let jetskiicontroller = {
    index: async (req,res) => {
        let recipes = await Jetskiis.find().sort({createdAt : -1})
        return res.json(recipes)
    },



  store: async (req, res) => {
    try {
      const { title, description, about, price } = req.body;

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "Upload images" });
      }

      let uploadedImages = [];
      for (const file of req.files) {
        const base64 = file.buffer.toString("base64");
        const dataURI = `data:${file.mimetype};base64,${base64}`;
        const uploaded = await cloudinary.uploader.upload(dataURI, {
          folder: "jetskii",
        });
        uploadedImages.push(uploaded.secure_url);
      }

      const jetskii = await Jetskiis.create({
        owner: req.user._id, // ⭐⭐ CRITICAL ⭐⭐
        title,
        description,
        about,
        price,
        images: uploadedImages,
      });

      res.json({ success: true, jetskii });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

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