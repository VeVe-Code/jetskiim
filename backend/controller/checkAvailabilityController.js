// const Booking = require("../model/booking");

// const checkAvailability = async ({
//   jetskiiId,
//   checkInDate,
//   checkInTime
// }) => {
//   const booking = await Booking.findOne({
//     jetskii: jetskiiId,
//     checkInDate,
//     checkInTime
//   });

//   return !booking; // true if available
// };

// module.exports = checkAvailability;

const Booking = require("../model/booking");

const checkAvailability = async (req, res) => {
  try {
    const { jetskiiId, checkInDate, checkInTime } = req.body;

    const booking = await Booking.findOne({
      jetskii: jetskiiId,
      checkInDate: new Date(checkInDate), // convert ISO string to Date
      checkInTime
    });

    return res.json({ isAvailable: !booking });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = checkAvailability;