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

// let User = require('../model/User')
// const { Webhook } = require("svix")

// let clertWebhooks = async (req, res) => {
//     try {
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

//         const headers = {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"]
//         }

//         await whook.verify(JSON.stringify(req.body), headers)

//         const { data, type } = req.body

//         let userData = {
//             clerkId: data.id,
//             email: data.email_addresses[0].email_address,
//             username: data.first_name+ " " +data.last_name,
//             image: data.image_url
//         }

//         switch (type) {

//             case "user.created":
//                 await User.create(userData)
//                 break

//             case "user.updated":
//                 await User.findOneAndUpdate (data.id, userData)
//                 break

//             case "user.deleted":
//                 await User.findOneAndDelete( data.id )
//                 break
//         }

//         res.json({ success: true, message: "Webhook Received" })
//     } 
//     catch (e) {
//         console.log(e.message)
//         res.json({ success: false, message: e.message })
//     }
// }

// module.exports = clertWebhooks



////
// Disable body parsing for Vercel
// pages/api/webhooks/clerk.js
export const config = {
  api: {
    bodyParser: false, // raw buffer required
  },
};

const { Webhook } = require("svix");
const User = require("../model/User");
const dbConnect = require("../../utils/dbConnect");

// Helper to read raw buffer
async function buffer(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", chunk => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  await dbConnect(); // ensure DB is connected

  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const buf = await buffer(req);
    const evt = await whook.verify(buf, headers);

    const { data, type } = evt;

    // Log for debugging
    console.log("Webhook type:", type, "Clerk ID:", data.id);

    const userData = {
      clerkId: data.id,
      email: data.email_addresses?.[0]?.email_address,
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url,
    };

    if (type === "user.created") {
      const existingUser = await User.findOne({ clerkId: data.id });
      if (!existingUser) {
        await User.create(userData);
        console.log("✅ User created:", data.id);
      }
    }

    if (type === "user.updated") {
      await User.findOneAndUpdate({ clerkId: data.id }, userData, { new: true });
      console.log("✏️ User updated:", data.id);
    }

    if (type === "user.deleted") {
      await User.findOneAndDelete({ clerkId: data.id });
      console.log("🗑️ User deleted:", data.id);
    }

    return res.status(200).json({ success: true, message: "Webhook received" });
  } catch (err) {
    console.error("❌ Clerk Webhook Error:", err.message);
    return res.status(400).json({ success: false, message: err.message });
  }
}
