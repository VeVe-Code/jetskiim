import React from "react";

export default function MyBooking() {
  const bookings = [
    {
      id: "BK-1001",
      name: "Jet Ski 1",
      date: "2025-01-20",
      time: "10:00 AM",
      duration: "1hr",
      price: 150,
      image: "/05.jpg",
      status: "Confirmed",
    },
    {
      id: "BK-1002",
      name: "Jet Ski 2",
      date: "2025-01-25",
      time: "3:00 PM",
      duration: "2hr",
      price: 180,
      image: "/8f.jpg",
      status: "Pending",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {/* If no bookings */}
      {bookings.length === 0 && (
        <p className="text-gray-500 text-lg text-center mt-20">
          You have no bookings yet.
        </p>
      )}

      {/* Booking List */}
      <div className="space-y-6">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-300"
          >
            {/* Image */}
            <img
              src={b.image}
              className="w-full md:w-64 h-48 object-cover"
              alt=""
            />

            {/* Details */}
            <div className="flex-1 p-6">
              <h2 className="text-2xl font-bold">{b.name}</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 text-gray-600">
                <p><span className="font-semibold">Booking ID:</span> {b.id}</p>
                <p><span className="font-semibold">Date:</span> {b.date}</p>
                <p><span className="font-semibold">Time:</span> {b.time}</p>
                <p><span className="font-semibold">Duration:</span> {b.duration}</p>
                <p><span className="font-semibold">Price:</span> ${b.price}</p>
              </div>

              {/* Status */}
              <div className="mt-4">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    b.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {b.status}
                </span>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex gap-4">
                <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  View Details
                </button>

                <button className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
