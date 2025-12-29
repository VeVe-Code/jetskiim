import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import toast from "react-hot-toast";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@clerk/clerk-react";

export default function AdminServicesDetail() {
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

  /* =========================
     FETCH JETSKI
  ========================= */
  useEffect(() => {
    const fetchJetski = async () => {
      try {
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

  /* =========================
     TIME SLOTS
  ========================= */
  const generateTimeSlots = () => {
    const slots = [];
    let hour = 10;
    let minute = 0;

    while (hour < 17) {
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

    // TEMP booked times (replace with API later)
    const bookedTimes = [];

    setTimeSlots(
      slots.map((slot) => ({
        ...slot,
        isBooked: bookedTimes.includes(slot.value),
      }))
    );

    setSelectedTime("");
  }, [date]);

  /* =========================
     HANDLE BOOKING
  ========================= */
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
        toast.error("Login required");
        return;
      }

      // 1️⃣ Check availability
      const checkRes = await axios.post(
        "/api/bookings/check-availability",
        {
          jetskiiId: id,
          checkInDate: date.toISOString(),
          checkInTime: selectedTime,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!checkRes.data.isAvailable) {
        toast.error("Time slot not available");
        return;
      }

      // 2️⃣ Create booking
      const bookingRes = await axios.post(
        "/api/bookings",
        {
          jetskiiId: id,
          checkInDate: date.toISOString(),
          checkInTime: selectedTime,
          paymentMethod: "stripe",
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
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setLoadingBooking(false);
    }
  };

  /* =========================
     UI
  ========================= */
  if (loadingData) return <h1 className="p-10 text-center">Loading...</h1>;
  if (!jetski) return <h1 className="p-10 text-center">Not found</h1>;

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-extrabold mb-6 flex items-center gap-2">
        <BookOpenIcon className="w-8 h-8 text-blue-600" />
        {jetski.title}
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <img
            src={mainImage}
            className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
            alt={jetski.title}
          />

          <div className="mt-6 bg-white p-6 rounded-xl shadow border">
            <p className="text-xl">{jetski.description}</p>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              ${jetski.price}
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Calendar
              value={date}
              onChange={setDate}
              minDate={new Date()}
            />

            {date && (
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot.value}
                    disabled={slot.isBooked}
                    onClick={() => setSelectedTime(slot.value)}
                    className={`p-2 rounded-lg border
                      ${slot.isBooked && "bg-gray-300"}
                      ${selectedTime === slot.value && "bg-blue-600 text-white"}
                    `}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={loadingBooking}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
            >
              {loadingBooking ? "Booking..." : "Book Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
