import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

function Dashboard() {
  const { currency, getToken, axios, toast,user } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    bookings: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get("/api/bookings/owner", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setDashboardData(data.dashboard);
      } else {
        toast.error(data.message || "No data found");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Owner Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg bg-white shadow">
          <h2 className="text-gray-500">Total Bookings</h2>
          <p className="text-xl font-bold">{dashboardData.totalBookings}</p>
        </div>

        <div className="p-4 border rounded-lg bg-white shadow">
          <h2 className="text-gray-500">Total Revenue</h2>
          <p className="text-xl font-bold">
            {currency}{dashboardData.totalRevenue}
          </p>
        </div>
      </div>

      {/* Bookings */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Recent Bookings</h2>

        {dashboardData.bookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet.</p>
        ) : (
          <div className="space-y-4">
            {dashboardData.bookings.map((b) => (
              <div
                key={b._id}
                className="p-4 border rounded-lg bg-white shadow"
              >
                <h3 className="font-semibold">{b.jetskii?.title}</h3>
                <p className="text-sm text-gray-600">
                  Customer: {b.user?.firstName} {b.user?.lastName}
                </p>
                <p className="text-sm">
                  Price: <span className="font-semibold">{currency}{b.totalPrice}</span>
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(b.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
