import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// SAMPLE DATA
const jetskii = [
  {
    id: 1,
    name: "Jet Ski 1",
    time: "1hr",
    price: 150,
    image: "/05.jpg",
    images: ["/05.jpg", "/8f.jpg", "/3321_99.jpg", "/wp3955242.jpg"],
  },
  {
    id: 2,
    name: "Jet Ski 2",
    time: "2hr",
    price: 180,
    image: "/8f.jpg",
    images: ["/8f.jpg", "/8f-2.jpg", "/8f-3.jpg", "/8f-4.jpg"],
  },
  {
    id: 3,
    name: "Jet Ski 3",
    time: "3hr",
    price: 200,
    image: "/3321_99.jpg",
    images: ["/3321_99.jpg", "/3321_99b.jpg", "/3321_99c.jpg", "/3321_99d.jpg"],
  },
];

// GENERATE 15-MINUTE SLOTS
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

export default function ServicesDetail() {
  const { id } = useParams();
  const jetski = jetskii.find((item) => item.id === Number(id));

  const [value, setValue] = useState(null);
  const [dateSelected, setDateSelected] = useState(false);
  const [mainImage, setMainImage] = useState(jetski?.images[0]);

  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    if (!value) return;

    const slots = generateTimeSlots();
    const bookedTimes = ["12:15", "14:30"]; // Fake data

    const updated = slots.map((s) => ({
      ...s,
      isBooked: bookedTimes.includes(s.value),
    }));

    setTimeSlots(updated);
    setSelectedTime("");
  }, [value]);

  if (!jetski)
    return <h1 className="p-10 text-center">Service Not Found</h1>;

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 md:px-6 lg:px-10 ">

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6">{jetski.name}</h1>

      {/* MAIN WRAPPER */}
      <div className="grid lg:grid-cols-3 gap-10">

        {/* LEFT SIDE — IMAGES + INFO */}
        <div className="lg:col-span-2">

          {/* GALLERY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

            {/* Main Image */}
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

          {/* INFO BOX */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border">

            <p className="text-3xl md:text-4xl font-extrabold text-blue-600">
              ${jetski.price}
            </p>
            <p className="text-gray-500 text-lg mb-4">
              Duration: {jetski.time}
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              Enjoy an unforgettable Jet Ski adventure with premium equipment,
              crystal-clear water, and top-tier safety.
            </p>

            {/* Book Button */}
            <button className="
              w-full md:w-48 py-4
              bg-blue-600 text-white
              rounded-xl text-lg font-semibold
              hover:bg-blue-700 active:scale-95 transition
            ">
              Book Now
            </button>

          </div>

        </div>

        {/* RIGHT SIDE — CALENDAR + TIME */}
        <div className="bg-gray-50 border rounded-2xl shadow-inner p-6 h-fit">

          <h3 className="text-xl font-semibold mb-4">Select Your Date</h3>

          <div className="rounded-xl overflow-hidden border mb-6">
            <Calendar
              value={value}
              onChange={(date) => {
                setValue(date);
                setDateSelected(true);
              }}
            />
          </div>

          {/* TIMES */}
          {dateSelected && (
            <>
              <h3 className="text-xl font-semibold mb-3">Available Times</h3>

              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.value}
                    disabled={slot.isBooked}
                    onClick={() => setSelectedTime(slot.value)}
                    className={`
                      p-2 rounded text-sm border
                      ${slot.isBooked
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white hover:bg-blue-50"}
                      ${selectedTime === slot.value
                        ? "bg-green-600 text-white border-green-600"
                        : ""}
                    `}
                  >
                    {slot.label}
                    {slot.isBooked && (
                      <span className="block text-[10px]">(Booked)</span>
                    )}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <p className="mt-4 text-center font-semibold text-green-700">
                  Selected Time: {selectedTime}
                </p>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}
