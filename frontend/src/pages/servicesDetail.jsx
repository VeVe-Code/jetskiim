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

  /* ================= FETCH JETSKI ================= */
useEffect(() => {
  const fetchJetski = async () => {
    try {
      setLoadingData(true);

      const res = await axios.get(`/api/jetskii/${id}`);

      // ✅ SAFE: supports both API response formats
      const jetskiData = res.data.data || res.data;

      if (!jetskiData) {
        throw new Error("Jetski data missing");
      }

      setJetski(jetskiData);

      // ✅ SAFE optional chaining
      setMainImage(jetskiData.images?.[0] || null);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load service");
    } finally {
      setLoadingData(false);
    }
  };

  fetchJetski();
}, [id]);


  /* ================= TIME SLOTS ================= */
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

  useEffect(() => {
    if (!date) return;

    const slots = generateTimeSlots();
    const bookedTimes = ["12:15", "14:30"]; // demo only

    setTimeSlots(
      slots.map((slot) => ({
        ...slot,
        isBooked: bookedTimes.includes(slot.value),
      }))
    );

    setSelectedTime("");
  }, [date]);

  /* ================= BOOKING ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !selectedTime) {
      toast.error("Please select date and time");
      return;
    }

    try {
      setLoadingBooking(true);

      const token = await getToken();
      if (!token) {
        toast.error("You must be logged in");
        return;
      }

      const bookingRes = await axios.post(
        "/api/bookings",
        {
          jetskiiId: id,
          jetskiTitle: jetski.title,
          checkInDate: date.toISOString(),
          checkInTime: selectedTime,
          totalPrice: jetski.price,
          paymentMethod: "pay at jetskii",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (bookingRes.data.success) {
        toast.success("Booking successful");
        navigate("/my-bookings");
      } else {
        toast.error("Booking failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Booking failed");
    } finally {
      setLoadingBooking(false);
    }
  };

  /* ================= STATES ================= */
  if (loadingData) {
    return <h1 className="p-10 text-center">Loading service...</h1>;
  }

  if (!jetski) {
    return <h1 className="p-10 text-center">Service not found</h1>;
  }

  /* ================= UI ================= */
  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 md:px-6 lg:px-10">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 flex items-center gap-2">
        <BookOpenIcon className="w-8 h-8 text-blue-600" />
        {jetski.title}
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={mainImage}
                alt={jetski.title}
                className="w-full h-[320px] md:h-[400px] object-cover"
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
                    alt={`thumb-${i}`}
                    className="w-full h-[90px] md:h-[120px] object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border space-y-4">
            <h2 className="text-2xl font-bold">{jetski.title}</h2>
 <h2 className="text-2xl font-bold">{jetski.description}</h2>
            {/* ✅ ABOUT SHOWS HERE */}
            <p className="text-gray-700 leading-relaxed">
              {jetski.about}
            </p>

            <p className="text-3xl font-extrabold text-blue-600">
              ${jetski.price}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 border rounded-2xl shadow-inner p-6 h-fit"
        >
          <Calendar value={date} onChange={setDate} minDate={new Date()} />

          {date && (
            <>
              <h3 className="text-xl font-semibold mb-3 mt-5">
                Available Times
              </h3>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.value}
                    type="button"
                    disabled={slot.isBooked}
                    onClick={() => setSelectedTime(slot.value)}
                    className={`p-2 rounded text-sm border
                      ${slot.isBooked ? "bg-gray-200 text-gray-400" : "bg-white"}
                      ${
                        selectedTime === slot.value
                          ? "bg-green-600 text-white"
                          : ""
                      }`}
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
