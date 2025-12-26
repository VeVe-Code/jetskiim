import React from "react";
import ToggleSwitch from "../../components/owner/ToggleSwitch";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

function AdminServiceCard({ j, toggleAvalability, onDeleted }) {
  const { getToken } = useAuth();

  const deleteJetskii = async () => {
    try {
      const token = await getToken();

      const res = await axios.delete(`/api/jetskii/${j._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        onDeleted(j._id);
      }
    } catch (error) {
      console.error(
        "Delete failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="p-6 rounded-lg shadow bg-white hover:shadow-lg transition">
      <img
        src={j.images?.[0] || "https://placehold.co/400"}
        className="w-full h-48 rounded object-cover"
        alt={j.title}
      />

      <h3 className="mt-4 text-xl font-semibold">{j.title}</h3>

      <p className="text-gray-600 mt-2 line-clamp-2">
        {j.description}
      </p>

      <p className="mt-2 font-bold text-blue-600 text-lg">
        ${j.price}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-gray-600 font-medium">Available</span>
        <ToggleSwitch
          checked={j.isAvailable}
          onChange={() => toggleAvalability(j._id)}
        />
      </div>

      <button
        onClick={deleteJetskii}
        className="mt-3 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Delete
      </button>

      <Link to={`/owner/JetSkiiServiceDetail/${j._id}`}>
        <button className="mt-4 w-full px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Detail page
        </button>
      </Link>
    </div>
  );
}

export default AdminServiceCard;
