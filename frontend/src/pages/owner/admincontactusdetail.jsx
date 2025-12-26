import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AdminContactUsDetail() {
  const { id } = useParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/contactus/${id}`);
      setMessage(res.data);
      console.log(res.data);
    };
    fetchData();
  }, [id]);

  if (!message) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Contact Message Detail
        </h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-medium">{message.name}</p>
          </div>

          {/* Email */}
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg">{message.email}</p>
          </div>

          {/* Phone */}
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-lg">{message.phone}</p>
          </div>

          {/* Message */}
          <div>
            <p className="text-sm text-gray-500">Message</p>
            <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
              <p className="text-gray-700">{message.message}</p>
            </div>
          </div>

          {/* Date */}
          <div className="text-sm text-gray-400 pt-4 border-t">
            Received on:{" "}
            {new Date(message.createdAt).toLocaleString()}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminContactUsDetail;
