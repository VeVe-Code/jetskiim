const Booking = require("../model/booking");

const checkAvailability = async ({
  jetskiiId,
  checkInDate,
  checkOutDate,
  checkInTime,
  checkOutTime
}) => {
  // check if booked
  const existing = await Booking.findOne({
    jetskii: jetskiiId,
    checkInDate,
    checkInTime
  });

  return !existing;  // true = available
};

module.exports = checkAvailability;
