import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

function Dashboard() {
  const { currency, axios } = useAppContext();
  const { getToken } = useAuth();

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    bookings: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = await getToken();

        const { data } = await axios.get("/api/bookings/owner", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDashboardData(data.dashboard);
      } catch (err) {
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Owner Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <p>Total Bookings</p>
          <h2>{dashboardData.totalBookings}</h2>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <p>Total Revenue</p>
          <h2>{currency}{dashboardData.totalRevenue}</h2>
        </div>
      </div>

      <div>
        <h2 className="font-semibold mt-6">Recent Bookings</h2>

        {dashboardData.bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          dashboardData.bookings.map(b => (
            <div key={b._id} className="border p-4 rounded mt-2">
              <p>{b.jetskii.title}</p>
              <p>Customer: {b.user.username}</p>
              <p>Price: {currency}{b.totalPrice}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
