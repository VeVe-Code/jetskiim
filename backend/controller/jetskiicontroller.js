let jetskiicontroller = {
    index: (req,res) => {
        return res.json({msg:"get all jetskii"})
    },
    store: (req,res) => {
        return res.json({msg:"store a jetskii"})
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