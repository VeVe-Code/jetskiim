// const nodemailer = require("nodemailer");

// // Create a test account or replace with real credentials.
// const transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 587,
// //   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.SMTP_USER || "",
//     pass: process.env.SMTP_PASS || "",
//   },
// });
// module.exports = transporter;

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 587,

//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
 
// });

// transporter.verify((error, success) => {
//   if (error) {
//     console.error("❌ SMTP VERIFY ERROR:", error);
//   } else {
//     console.log("✅ SMTP is READY to send emails");
//   }
// });

// module.exports = transporter;

// // ✅ ADD THIS HERE (ONLY ONCE)


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // ✅ FIXES self-signed cert issue
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP VERIFY ERROR:", error);
  } else {
    console.log("✅ SMTP is READY to send emails");
  }
});

module.exports = transporter;

