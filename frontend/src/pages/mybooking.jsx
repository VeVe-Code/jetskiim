import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export default function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getToken, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    const fetchBookings = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const { data } = await axios.get("/api/bookings/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("BOOKINGS RESPONSE:", data);

        // Always force array
        setBookings(Array.isArray(data.bookings) ? data.bookings : []);
      } catch (error) {
        console.error("BOOKING ERROR:", error.response || error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [getToken, isLoaded]);

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-lg text-center mt-20">
          You have no bookings yet.
        </p>
      ) : (
        <div className="space-y-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden border"
            >
              {/* Image */}
              <img
                src={b.jetskii?.images?.[0] || "/placeholder.jpg"}
                alt={b.jetskii?.title}
                className="w-full md:w-64 h-48 object-cover"
              />

              {/* Details */}
              <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold">
                  {b.jetskii?.title || "Jetski"}
                </h2>

                <div className="mt-3 text-gray-600 space-y-1">
                  <p>
                    <span className="font-semibold">Status:</span> {b.status}
                  </p>
                  <p>
                    <span className="font-semibold">Price:</span>{" "}
                    ${b.jetskii?.price}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(b.checkInDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold">Time:</span>{" "}
                    {b.checkInTime}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
