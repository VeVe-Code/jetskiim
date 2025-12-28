import React from "react";
import { UserButton } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Sidebar({ open, setOpen }) {
  const location = useLocation();

  const linkClass = (path) =>
    `w-full py-4 rounded text-center transition
     ${
       location.pathname === path
         ? "bg-blue-600 text-white"
         : "bg-blue-300 hover:bg-blue-400 text-black"
     }`;

  return (
    <>
      {/* Overlay (Mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static z-50 top-0 left-0 h-screen
          w-64 md:w-72 lg:w-80
          bg-gray-950 text-white p-6
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Mobile Back */}
        <button
          onClick={() => setOpen(false)}
          className="md:hidden absolute top-4 right-4"
        >
          <FaArrowLeft size={22} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <h1 className="font-bold text-2xl">LOGO</h1>
          <span className="text-sm opacity-80">Jet Skii</span>
        </div>

        <UserButton />

        {/* Menu */}
        <nav className="mt-8 space-y-4 overflow-y-auto">
          <Link to="/owner" onClick={() => setOpen(false)}>
            <button className={linkClass("/owner")}>Dashboard</button>
          </Link>

          <Link to="/owner/jetskiiservice" onClick={() => setOpen(false)}>
            <button className={linkClass("/owner/jetskiiservice")}>
              Jetskii Services
            </button>
          </Link>

          <Link to="/owner/adminContactus" onClick={() => setOpen(false)}>
            <button className={linkClass("/owner/adminContactus")}>
              Contact Us
            </button>
          </Link>
        </nav>

        {/* Mobile Close */}
        <button
          onClick={() => setOpen(false)}
          className="md:hidden w-full mt-8 bg-red-500 py-3 rounded"
        >
          Close
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
