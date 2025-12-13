import React, { useEffect, useState } from "react";
import Jetskiicard from "../components/jetskiicard";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  let [jetskii, setJetskii] = useState([])
  
 useEffect(()=>{
  let fetchdata = async()=>{
    let res = await axios.get('/api/jetskii')
    setJetskii(res.data)
    console.log(res.data)
      console.log(res.data);
  }
  fetchdata()
 },[])

 if (jetskii.length === 0) return null;
  return  (
    <div className="w-full min-h-screen font-sans overflow-x-hidden">

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative w-full h-screen">
        {/* Background Video (Use image if no video) */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src="videoplayback.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>

        {/* Center Logo */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white px-4">
          <img
            src="/images/logo.png"
            alt="Jet Cars Turks"
            className="w-[600px] max-w-full drop-shadow-xl"
          />

          <p className="mt-6 text-sm opacity-80">
            Experience The Thrill Of Jet Car Riding In The Stunning Waters Of Turks And Caicos
          </p>

          <button className="mt-4 px-6 py-2 bg-white/90 text-black rounded shadow hover:bg-white">
            Book Now
          </button>
        </div>

        {/* Scroll Down Arrow */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-10 h-10 flex items-center justify-center bg-white/70 rounded-full shadow">
            <span className="text-xl text-black">⌄</span>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 1 ===================== */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          <img
            src="/wp3955242.jpg"
            className="w-full h-64 object-cover rounded-lg shadow"
            alt="Jet Cars"
          />

          <div>
            <h2 className="text-2xl font-bold mb-3">Explore Turks & Caicos</h2>
            <p className="text-gray-600">
              Turks & Caicos is filled with stunning blue waters that make it the perfect place for Jet Car adventures.
              Ride the ocean like never before with our powerful Jet Cars.
            </p>

            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 2 ===================== */}
      <section className="py-24 bg-gradient-to-b from-[#b1edf0] to-white px-6 md:px-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          <div>
            <h2 className="text-2xl font-bold mb-3">For The Adrenaline Seekers!</h2>
            <p className="text-gray-700">
              Our Jet Cars offer the perfect way to enjoy incredible ocean views, extreme speed,
              and unforgettable experiences.
            </p>

            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Learn More
            </button>
          </div>

          <img
            src="/3321_99.jpg"
            className="w-full h-64 object-cover rounded-lg shadow"
            alt="Jet Car Ride"
          />
        </div>
      </section>

      {/* ===================== PACKAGES ===================== */}
   <section className="py-20 px-6 md:px-10 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">Reserve Your Jet Car Today!</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto">

          {/* CARD 1 */}
          {jetskii.slice(0,4).map((j)=> (
            <Jetskiicard j={j} key={j._id}/>
          )    )}

          
      
        </div>
          <div className="mt-3">
      <Link to="/allservices">
         <button className="py-4 px-3 bg-blue-600 rounded text-white">
          View all jetskii services
         </button></Link>
        </div>
      </section>
  <div className="bg-gradient-to-b from-[#b1edf0] to-white">
     <div className="max-w-6xl mx-auto flex text-center p-5 rounded-lg ">
  <div className="flex gap-10 w-full ">

    {/* LEFT SIDE */}
    <div className="md:w-1/2 space-y-3 text-left">
      <h1 className="text-3xl font-bold text-black">Follow Us</h1>

      <p className="text-black">
        Connect with us on Facebook and{" "}
        <a href="#" className="text-white underline">Instagram</a>
        {" "}(@jetcarsturks) for inquiries and bookings!
      </p>

      <p className="text-black">
        For direct communication, reach out via email at{" "}
        <a href="mailto:info@Jetcarsturks.com" className="text-white underline">
          info@Jetcarsturks.com
        </a>{" "}
        or WhatsApp at <span className="font-semibold">+1 (649) 332-2277</span>.
      </p>

      <p className="text-black">
        All tours will start at the Blue Haven Marina.{" "}
        <a href="#" className="text-white underline">Google Pin</a>
      </p>
    </div>

    {/* RIGHT SIDE — MAP */}
    <div className="md:w-1/2">
      <iframe
        className="w-full h-64 rounded-lg border"
        loading="lazy"
        allowFullScreen
        src="https://www.google.com/maps/embed?pb=!1m18..."
      ></iframe>
    </div>

  </div>
</div>
<h1>hello</h1>
  </div>


    </div>
  );
}
