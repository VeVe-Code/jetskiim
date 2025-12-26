import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminContactUs() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/contactus");
      setMessages(res.data.jetskiis);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
        Admin – Contact Messages
      </h1>

      {/* ================= TABLE (Desktop) ================= */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3 text-center">Messages Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {messages.map((msg) => (
              <tr key={msg._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{msg.name}</td>
                <td className="px-6 py-4 text-gray-600">{msg.email}</td>
                <td className="px-6 py-4">{msg.phone}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <Link to={`/owner/AdminContactus/${msg._id}`}>
                    <button className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600">
                      View
                    </button>
                  </Link>
             
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= CARDS (Mobile) ================= */}
      <div className="md:hidden space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className="bg-white rounded-xl shadow p-4 space-y-2"
          >
            <div>
              <p className="text-xs text-gray-500">Name</p>
              <p className="font-medium">{msg.name}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-gray-700 break-all">{msg.email}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p>{msg.phone}</p>
            </div>

            <div className="flex gap-2 pt-2">
              <Link to={`/owner/AdminContactus/${msg._id}`} className="flex-1">
                <button className="w-full px-3 py-2 text-sm rounded bg-blue-500 text-white hover:bg-blue-600">
                  View
                </button>
              </Link>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminContactUs;
