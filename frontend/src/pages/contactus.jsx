import axios from "axios";
import React, { useState } from "react";

function ContactUs() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [message, setMessage] =useState("");

let handleSubmit = async (e) => {
  e.preventDefault();

  let data = {
    name,
    email,
    phone,
    message
  };

  try {
    let res = await axios.post("/api/contactus", data);

    if (res.status === 200) {
      alert("Message sent successfully!");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      
    }

    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
         
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}

          <input
          value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
     
          {/* Email */}
          <input
          value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        
          {/* Phone */}
          <input
          value ={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            placeholder="Phone Number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        
          {/* Message */}
          <textarea
          value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            placeholder="Your Message"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
     

          {/* Button */}
          <button

            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
