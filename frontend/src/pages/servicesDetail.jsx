import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

export default function ServicesDetail() {
  const { id } = useParams();

  const [jetski, setJetski] = useState(null);
  const [value, setValue] = useState(null);
  const [dateSelected, setDateSelected] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get(`/api/jetskii/${id}`);
        if (res.status === 200) {
          setJetski(res.data);      // ✅ store as object
          setMainImage(res.data.images[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  // Generate time slots
  function generateTimeSlots() {
    const slots = [];
    let hour = 10;
    let minute = 0;

    while (hour < 17 || (hour === 17 && minute <= 0)) {
      const label = new Date(2025, 1, 1, hour, minute).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const value = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;

      slots.push({ label, value });

      minute += 15;
      if (minute >= 60) {
        minute = 0;
        hour++;
      }
    }
    return slots;
  }

  useEffect(() => {
    if (!value) return;

    const slots = generateTimeSlots();
    const bookedTimes = ["12:15", "14:30"];

    const updated = slots.map((s) => ({
      ...s,
      isBooked: bookedTimes.includes(s.value),
    }));

    setTimeSlots(updated);
    setSelectedTime("");
  }, [value]);

  // If data not loaded
  if (!jetski) return <h1 className="p-10 text-center">Loading service...</h1>;

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 md:px-6 lg:px-10 ">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6">{jetski.name}</h1>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {/* Main Image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-xl group">
              <img
                src={mainImage}
                className="w-full h-[320px] md:h-[400px] object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
              {jetski.images.slice(1).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className="rounded-xl overflow-hidden border shadow-sm hover:shadow-md"
                >
                  <img
                    src={img}
                    className="w-full h-[90px] md:h-[120px] object-cover transition hover:scale-110"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border">
            <p className="text-3xl md:text-4xl font-extrabold text-blue-600">
              ${jetski.price}
            </p>
            <p className="text-gray-500 text-lg mb-4">Duration: {jetski.time}</p>

            <button className="w-full md:w-48 py-4 bg-blue-600 text-white rounded-xl">
              Book Now
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-gray-50 border rounded-2xl shadow-inner p-6 h-fit">
          <Calendar
            value={value}
            onChange={(date) => {
              setValue(date);
              setDateSelected(true);
            }}
          />

          {dateSelected && (
            <>
              <h3 className="text-xl font-semibold mb-3 mt-5">Available Times</h3>

              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.value}
                    disabled={slot.isBooked}
                    onClick={() => setSelectedTime(slot.value)}
                    className={`
                      p-2 rounded text-sm border
                      ${slot.isBooked ? "bg-gray-200 text-gray-400" : "bg-white"}
                      ${selectedTime === slot.value ? "bg-green-600 text-white" : ""}
                    `}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
