// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true
//     },
//     description: {
//       type: String,
//       required: true
//     },
//     about: {
//       type: String,
//       required: true
//     },

//     checkInDate: {
//       type: Date,
//       required: true
//     },
//     checkOutDate: {
//       type: Date,
//       required: true
//     },

//     checkInTime: {
//       type: String,
//       required: true
//     },
//     checkOutTime: {
//       type: String,
//       required: true
//     },

//     totalPrice: {
//       type: Number,
//       required: true
//     },

//     status: {
//       type: String,
//       enum: ["pending", "confirmed", "cancelled"],
//       default: "pending"
//     },

//     paymentMethod: {
//       type: String,
//       default: "pay at jetskii",
//       required: true
//     },

//     isPaid: {
//       type: Boolean,
//       default: false
//     }

//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Booking", bookingSchema);

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    jetskii: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jetskii",
      required: true,
    },
    jetskiTitle: {
  type: String,
  required: true
},

    checkInDate: {
      type: Date,
      required: true,
    },

    checkInTime: {
      type: String,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      default: "pay at jetskii",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
