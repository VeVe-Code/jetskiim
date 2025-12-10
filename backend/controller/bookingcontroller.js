const booking = require("../model/booking");
const Booking = require("../model/booking");
const Jetskiis = require("../model/Jetskiis");
const checkAvailability = require("./checkAvailabilityFunctionHere");

let createBooking = async (req, res) => {
  try {
    let { 
      jetskiiId,
      title,
      checkInDate, 
      checkOutDate, 
      checkInTime, 
      checkOutTime 
    } = req.body;

    // Validate availability
    let isAvailable = await checkAvailability({ 
      title, 
      checkInDate, 
      checkOutDate, 
      checkInTime, 
      checkOutTime 
    });

    if (!isAvailable) {
      return res.json({
        success: false,
        message: "This jetskii is already booked at that time."
      });
    }

    // Get jetskii data
    let jetskiiData = await Jetskiis.findById(jetskiiId);

    if (!jetskiiData) {
      return res.status(404).json({
        success: false,
        message: "Jetskii not found"
      });
    }

    // Calculate total price (simple example)
    let totalPrice = jetskiiData.price;

    // Create booking
    let newBooking = await Booking.create({
      title: jetskiiData.title,
      description: jetskiiData.description,
      about: jetskiiData.about,

      checkInDate,
      checkOutDate,
      checkInTime,
      checkOutTime,
      totalPrice
    });

    return res.json({
      success: true,
      booking: newBooking
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "server error"
    });
  }


};
    //API to get all booking for a user
    // GET /api/booking/user
    const checkAvailability = async (req, res) => {
  try {
    const { jetskiiId, checkInDate, checkOutDate, checkInTime, checkOutTime } = req.body;

    if (!jetskiiId || !checkInDate || !checkOutDate || !checkInTime || !checkOutTime) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Find overlapping bookings
    const existingBooking = await Booking.findOne({
      jetskii: jetskiiId,
      checkInDate,
      checkInTime,
    });

    if (existingBooking) {
      return res.json({
        success: false,
        available: false,
        message: "This jetskii is already booked at that time.",
      });
    }

    return res.json({
      success: true,
      available: true,
      message: "Jetskii is available",
    });

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Server error",
    });
  }
};

  let getUserBookings = async (req,res) => {
    try {
        let user = req.user._id
        let  bookings = (await booking.find({user}).populate("jetskii")).toSorted({createdAt: -1})
        res.json({success: true, bookings})
    } catch (error) {
         res.json({success: false, message: "Failed to fatch bookings"})
    }
  }

  let getOwnerJetskiiBookings = async (req, res) => {
    try {
        // 1️⃣ Find jetskii owned by logged-in owner
        const ownerId = req.user._id;

        const jetskiis = await Jetskiis.find({ owner: ownerId });

        if (jetskiis.length === 0) {
            return res.json({
                success: false,
                message: "No jetskiis found for this owner"
            });
        }

        // Extract jetskii IDs
        const jetskiiIds = jetskiis.map(j => j._id);

        // 2️⃣ Get all bookings for owner's jetskiis
        const bookings = await Booking.find({
            jetskii: { $in: jetskiiIds }
        })
            .populate("jetskii")
            .populate("user")
            .sort({ createdAt: -1 });

        // 3️⃣ Total bookings
        const totalBookings = bookings.length;

        // 4️⃣ Total revenue
        const totalRevenue = bookings.reduce((acc, b) => acc + (b.totalPrice || 0), 0);

        // 5️⃣ Return dashboard info
        return res.json({
            success: true,
            dashboard: {
                totalBookings,
                totalRevenue,
                bookings
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = { createBooking, getUserBookings,getOwnerJetskiiBookings };
