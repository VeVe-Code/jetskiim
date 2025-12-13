import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import toast from "react-hot-toast";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@clerk/clerk-react";

export default function ServicesDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [jetski, setJetski] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [date, setDate] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [loadingBooking, setLoadingBooking] = useState(false);

  // Fetch Jetski details
  useEffect(() => {
    const fetchJetski = async () => {
      try {
        setLoadingData(true);
        const res = await axios.get(`/api/jetskii/${id}`);
        setJetski(res.data);
        setMainImage(res.data.images?.[0]);
      } catch (err) {
        toast.error("Failed to load service");
      } finally {
        setLoadingData(false);
      }
    };
    fetchJetski();
  }, [id]);

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    let hour = 10;
    let minute = 0;

    while (hour < 17 || (hour === 17 && minute === 0)) {
      const label = new Date(2025, 1, 1, hour, minute).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const value = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      slots.push({ label, value });
      minute += 15;
      if (minute === 60) {
        minute = 0;
        hour++;
      }
    }

    return slots;
  };

  // Update available times when date changes
  useEffect(() => {
    if (!date) return;

    const slots = generateTimeSlots();

    // TODO: Replace with API call to get booked times for selected date
    const bookedTimes = ["12:15", "14:30"];

    const updated = slots.map((slot) => ({
      ...slot,
      isBooked: bookedTimes.includes(slot.value),
    }));

    setTimeSlots(updated);
    setSelectedTime("");
  }, [date]);

  // Handle booking
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !selectedTime) {
      toast.error("Please select date and time");
      return;
    }

    if (!jetski || !jetski.title) {
      toast.error("Service data not loaded yet. Please wait.");
      return;
    }

    try {
      setLoadingBooking(true);

      const token = await getToken();
      if (!token) {
        toast.error("You must be logged in to book");
        setLoadingBooking(false);
        return;
      }

      // Check availability (optional)
      const checkRes = await axios.post(
        "/api/bookings/check-availability",
        {
          jetskiiId: id,
          checkInDate: date.toISOString(),
          checkInTime: selectedTime,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!checkRes.data.isAvailable) {
        toast.error("Jetski is not available at this time");
        setLoadingBooking(false);
        return;
      }

      // Create booking
      const bookingRes = await axios.post(
        "/api/bookings",
        {
          jetskiiId: id,
          jetskiTitle: jetski.title, // ✅ always provided
          checkInDate: date.toISOString(),
          checkInTime: selectedTime,
          totalPrice: jetski.price,
          paymentMethod: "pay at jetskii",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (bookingRes.data.success) {
        toast.success("Booking successful");
        navigate("/my-booking");
        window.scrollTo(0, 0);
      } else {
        toast.error(bookingRes.data.message || "Booking failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setLoadingBooking(false);
    }
  };

  if (loadingData) return <h1 className="p-10 text-center">Loading service...</h1>;
  if (!jetski) return <h1 className="p-10 text-center">Service not found</h1>;

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 md:px-6 lg:px-10">
      {/* Jetski Name */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 flex items-center gap-2">
        <BookOpenIcon className="w-8 h-8 text-blue-600" /> {jetski.title}
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={mainImage}
                className="w-full h-[320px] md:h-[400px] object-cover"
                alt={jetski.title}
              />
            </div>
            <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
              {jetski.images?.slice(1).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img)}
                  className="rounded-xl overflow-hidden border"
                >
                  <img
                    src={img}
                    className="w-full h-[90px] md:h-[120px] object-cover"
                    alt={`${jetski.name} ${i}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border">
            <p className="text-2xl font-semibold">{jetski.name}</p>
            <p className="text-2xl font-semibold">{jetski.description}</p>
            <p className="text-2xl font-semibold">{jetski.about}</p>
            <p className="text-3xl font-extrabold text-blue-600">${jetski.price}</p>
            <p className="text-gray-500 text-lg">Duration: {jetski.time}</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 border rounded-2xl shadow-inner p-6 h-fit"
        >
          <Calendar value={date} onChange={setDate} minDate={new Date()} />

          {date && (
            <>
              <h3 className="text-xl font-semibold mb-3 mt-5">Available Times</h3>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.value}
                    type="button"
                    disabled={slot.isBooked}
                    onClick={() => setSelectedTime(slot.value)}
                    className={`p-2 rounded text-sm border
                      ${slot.isBooked ? "bg-gray-200 text-gray-400" : "bg-white"}
                      ${selectedTime === slot.value ? "bg-green-600 text-white" : ""}`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={!selectedTime || loadingBooking}
                className="w-full py-4 bg-blue-600 text-white rounded-xl disabled:bg-gray-400"
              >
                {loadingBooking ? "Booking..." : "Book Now"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
