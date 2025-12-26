const { default: mongoose } = require("mongoose")
const Contactus = require("../model/Contactus")

let contactuscontroller = {
    index : async(req,res) => {
        let jetskiis = await Contactus.find().sort({createdAt : -1})
         return res.json({jetskiis})
    },
    store :async (req,res) =>{
       try{ let {name,email,phone,message} = req.body
        let contactus = await Contactus.create({
            name,
            email,
            phone,
            message
        })
     return res.json(contactus)}catch(e){
        return res.status(500).json({msg: "server error"})
     }
    },
    show : async(req,res) =>{
        try{
        let id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(400).json({msg: "id is invaid "})
        }
        let contactus = await Contactus.findById(id)
            if(!contactus){ 
            return res.status(404).json({msg: "not found contactus"})
            }
        return res.json(contactus)
        }catch(e){
        return res.status(500).json({msg: "server error"})
        }
    },
    destory : async(req,res) =>{
          try{
        let id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(400).json({msg: "id is invaid "})
        }
        let contactus = await Contactus.findByIdAndDelete(id)
            if(!contactus){ 
            return res.status(404).json({msg: "not found contactus"})
            }
        return res.json(contactus)
        }catch(e){
        return res.status(500).json({msg: "server error"})
        }
    },
    update : async(req,res) =>{
         try{
        let id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(400).json({msg: "id is invaid "})
        }
        let contactus = await Contactus.findByIdAndUpdate(id,
      {...req.body}
        )
            if(!contactus){ 
            return res.status(404).json({msg: "not found contactus"})
            }
        return res.json(contactus)
        }catch(e){
        return res.status(500).json({msg: "server error"})
        }
    }

}
module.exports = contactuscontroller