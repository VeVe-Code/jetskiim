import React from "react";
import { UserButton } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ open, setOpen }) {
  const location = useLocation();

  const linkClass = (path) =>
    `w-full py-5 text-center rounded cursor-pointer transition
     ${
       location.pathname === path
         ? "bg-blue-500 text-white"
         : "bg-blue-300 hover:bg-blue-400"
     }`;

  return (
    <>
      {/* Overlay (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static z-50 top-0 left-0 h-full
          w-64 md:w-1/6 bg-gray-950 p-7 text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex gap-6 items-center mb-6">
          <h1 className="font-bold text-2xl">LOGO</h1>
          <h1>Jet Skii</h1>
        </div>

        <UserButton />

        {/* Menu */}
        <div className="mt-6 space-y-5">
         <div>
           <Link to="/owner" onClick={() => setOpen(false)}>
            <button className={linkClass("/owner")}>
              Dashboard
            </button>
          </Link>
         </div>

         <div>
           <Link to="/owner/jetskiiservice" onClick={() => setOpen(false)}>
            <button className={linkClass("/owner/jetskiiservices")}>
              Jetskii Services
            </button>
          </Link>
         </div>

        <div>
            <Link to="/owner/adminContactus" onClick={() => setOpen(false)}>
            <button className={linkClass("/owner/adminContactus")}>
              Contact us
            </button>
          </Link>
        </div>
        </div>

        {/* Close button (mobile only) */}
        <button
          onClick={() => setOpen(false)}
          className="md:hidden w-full mt-6 bg-red-500 py-3 rounded"
        >
          Close
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
