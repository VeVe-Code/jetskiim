import React from "react";

function About() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ===== Hero Section ===== */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">About Us</h1>
        <p className="text-xl max-w-2xl mx-auto">
          We are dedicated to providing the best service and creating
          amazing experiences for our customers.
        </p>
      </section>

      {/* ===== Mission / Vision Section ===== */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-gray-700 mb-8">
          Our mission is to empower users with top-quality solutions
          and outstanding support. We believe in innovation, trust,
          and excellence in everything we do.
        </p>
        <h2 className="text-3xl font-semibold mb-6">Our Vision</h2>
        <p className="max-w-3xl mx-auto text-gray-700">
          To become the leading platform that connects people and
          ideas worldwide, fostering growth, creativity, and
          collaboration.
        </p>
      </section>

      {/* ===== Team Section ===== */}
      <section className="py-16 px-4 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-12">Meet Our Team</h2>
       
      </section>

      {/* ===== Call-to-Action ===== */}
      <section className="py-16 text-center">
     
        <p className="text-gray-700 mb-8">
          Become part of our journey and experience our amazing platform.
        </p>

      </section>

    </div>
  );
}

export default About;
