import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Adminservicecard from "../../components/owner/adminservicecard.jsx";
import { useAppContext } from "../../context/AppContext";

function AllServices() {
  const { axios, getToken } = useAppContext(); // ✅ FIX
  const [jetskii, setJetskii] = useState([]);
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);

  // 🔵 Fetch Data (PUBLIC)
  const fetchdata = async () => {
    try {
      const res = await axios.get("/api/jetskii");
      if (res.status === 200) {
        setJetskii(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // 🟢 Toggle Availability (PROTECTED)
  const toggleAvalability = async (id) => {
    try {
      const token = await getToken(); // ✅ NOW DEFINED

      const { data } = await axios.patch(
        `/api/jetskii/${id}/toggle`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ AUTH
          },
        }
      );

      if (data.msg) {
        toast.success(data.msg);
        fetchdata();
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || "Server error"
      );
    }
  };

  // 🔍 Search filter
  const filtered = jetskii.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase())
  );


  let onDeleted = (_id) => {
     setJetskii((prevJetskii) => prevJetskii.filter((j) => j._id !== _id));
  }

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

        <Link to="/owner/JetSkiiServiceForm">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700 transition">
            + Add Service
          </button>
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((j) => (
          <Adminservicecard key={j._id} j={j} toggleAvalability={toggleAvalability} onDeleted={onDeleted}/>
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
