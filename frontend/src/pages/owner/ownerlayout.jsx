import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/owner/sidebar";

function OwnerLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center justify-between bg-gray-950 text-white px-4 py-3">
          <div className="flex gap-3 items-center">
            <h1 className="font-bold text-xl">LOGO</h1>
            <h1>Jet Skii</h1>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="text-2xl"
          >
            ☰
          </button>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default OwnerLayout;
