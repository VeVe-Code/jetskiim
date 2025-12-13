import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import ToggleSwitch from "../../components/owner/ToggleSwitch"; // <-- IMPORT

function AllServices() {
  const [jetskii, setJetskii] = useState([]);
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);

  // 🔵 Fetch Data
  const fetchdata = async () => {
    try {
      const res = await axios.get("/api/jetskii");
      if (res.status === 200) {
        setJetskii(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // 🟢 Toggle Availability API
 const toggleAvalability = async (id) => {
  try {
    const { data } = await axios.patch(`/api/jetskii/${id}/toggle`);

    if (data.msg) {
      toast.success(data.msg);
      fetchdata(); // refresh UI
    } else {
      toast.error("Something went wrong");
    }

  } catch (err) {
    console.log(err);
    toast.error("Server error");
  }
};


  // 🔍 Search filter
  const filtered = jetskii.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8 mt-16 md:mt-6">

      {/* 🔍 Search Bar */}
      <div className="flex justify-end mb-6">
        <motion.div
          animate={{ width: focused ? "90%" : "70%" }}
          transition={{ duration: 0.4, type: "spring" }}
          className="flex items-center rounded-2xl px-3 py-2 bg-white shadow border
                     sm:w-[16rem] md:w-[20rem] lg:w-[24rem]"
        >
          <Search className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search service..."
            className="w-full bg-transparent outline-none text-sm sm:text-base"
          />
        </motion.div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          All Jet Car Services
        </h1>

        <Link to="/addservice">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700 transition">
            + Add Service
          </button>
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {filtered.length > 0 ? (
          filtered.map((j) => (
            <div
              key={j._id}
              className="p-6 rounded-lg shadow bg-white hover:shadow-lg transition"
            >
              {/* Image */}
              <img
                src={
                  j.images && j.images.length > 0
                    ? j.images[0]
                    : "https://placehold.co/400"
                }
                className="w-full h-48 rounded object-cover"
              />

              {/* Title */}
              <h3 className="mt-4 text-xl font-semibold">{j.title}</h3>

              {/* Description */}
              <p className="text-gray-600 mt-2 line-clamp-2">
                {j.description}
              </p>

              {/* Price */}
              <p className="mt-2 font-bold text-blue-600 text-lg">
                ${j.price}
              </p>

              {/* 🔵 Availability Toggle */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-gray-600 font-medium">Available</span>

                <ToggleSwitch
                  checked={j.isAvailable}
                  onChange={() => toggleAvalability(j._id)}
                />
              </div>

              {/* Detail Button */}
              <Link to={`/service/${j._id}`}>
                <button className="mt-4 w-full px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Detail page
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No services found.
          </p>
        )}
      </div>
    </div>
  );
}

export default AllServices;
