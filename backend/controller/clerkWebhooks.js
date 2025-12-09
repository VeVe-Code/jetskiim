// const { Message } = require('svix/dist/api/message')
// let User = require('../model/User')

// let {Webhook} = require("svix")

// let clertWebhooks = async (req, res) => {
//     try{
//         let whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET )
//         let headers = {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp":req.headers["svix-timestamp"],
//              "svix-signature":req.headers["svix-signature"]
//         }

//         await whook.verify(JSON.stringify(req.body),headers)
//         const{data,type} = req.body
//         let userData ={
//             //_id:data.id,/////
//             email:data.email_addresses[0].email_address,
//             username: data.file.name + " " + data.last.name,
//             image: data.image.url

//         }
//         switch (type) {
//             case "user.created":{
//                 await User.create(userData);
//                 break;
//             }
//   case "user.created":{
//                 await User.findByIdAndUpdate(data.id, userData);
//                 break;
//             }
//               case "user.deleted":{
//                 await User.findByIdAndDelete(data.id);
//                 break;
//             }
        
//             default:
//                 break;
//         }
//         res.json({success: true, message : "Webhook Recieved"})
//     }catch(e){
//     console.log(error.message)
//      res.json({success: false, message : error.message})
//     }
// }
// module.exports=clertWebhooks

let User = require('../model/User')
const { Webhook } = require("svix")

let clertWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        }

        await whook.verify(JSON.stringify(req.body), headers)

        const { data, type } = req.body

        let userData = {
            clerkId: data.id,
            email: data.email_addresses[0].email_address,
            username: `${data.first_name} ${data.last_name}`,
            image: data.image_url
        }

        switch (type) {

            case "user.created":
                await User.create(userData)
                break

            case "user.updated":
                await User.findOneAndUpdate({ clerkId: data.id }, userData)
                break

            case "user.deleted":
                await User.findOneAndDelete({ clerkId: data.id })
                break
        }

        res.json({ success: true, message: "Webhook Received" })
    } 
    catch (e) {
        console.log(e.message)
        res.json({ success: false, message: e.message })
    }
}

module.exports = clertWebhooks
