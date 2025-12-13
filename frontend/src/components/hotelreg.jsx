import React, { useState } from "react";

const HotelReg = ({ closeModal }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black/70">
      
      <form className="flex bg-white rounded-xl max-w-4xl w-full max-md:mx-4 overflow-hidden">

        {/* LEFT IMAGE */}
        <img
          src="/20010-15942584.jpg"   // Change this to your own image
          alt="register"
          className="w-1/2 h-full object-cover hidden md:block"
        />

        {/* RIGHT CONTENT */}
        <div className="relative flex flex-col items-center md:w-1/2 p-8">

          {/* CLOSE BUTTON */}
          <button
            onClick={closeModal}
            type="button"
            className="absolute top-4 right-4 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6 text-gray-700 hover:text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* TITLE */}
          <p className="text-2xl font-semibold mt-6">
            Register Your Hotel
          </p>

          {/* FORM FIELDS */}
          <div className="w-full mt-6 flex flex-col gap-4">

            <input
              type="text"
              placeholder="Hotel Name"
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Location"
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Price per Night"
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              placeholder=" Description"
              rows="4"
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            ></textarea>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              Register
            </button>
          </div>

        </div>
      </form>

    </div>
  );
};

export default HotelReg;
