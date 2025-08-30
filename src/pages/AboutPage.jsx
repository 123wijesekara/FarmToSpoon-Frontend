import React from "react";
import { Link } from "react-router-dom";
import aboutHeaderImage from "../assets/About.jpg"; 
import visionImage from "../assets/About1.jpg";
 import missionImage from "../assets/About3.jpg";
import communityImage from "../assets/contact.jpg";
const AboutPage = () => {
  return (
    <div>
      {/* Header Section */}
      <header
        className="relative bg-cover bg-center h-72 md:h-96"
        style={{ backgroundImage: `url(${aboutHeaderImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white">About Us</h1>
        </div>
      </header>

      {/* Who We Are Section */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed">
              Farm To Spoon is an innovative digital marketplace that bridges
              the gap between local farmers and consumers. Founded with the
              purpose of supporting small-scale agriculture, we provide a
              platform that empowers farmers to showcase their products while
              giving consumers easy access to fresh, locally-grown produce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vision */}
            <div className="rounded-xl overflow-hidden shadow-md bg-green-50">
              <img
                src={visionImage}
                alt="Our Vision"
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg text-green-700 mb-2">
                  Our Vision
                </h3>
                <p className="text-sm text-gray-600">
                  We envision a future where every local farmer has direct
                  access to digital markets, and every consumer can easily
                  purchase fresh, organic produce directly from nearby farms.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="rounded-xl overflow-hidden shadow-md bg-green-50">
              <img
                src={missionImage}
                alt="Our Mission"
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg text-green-700 mb-2">
                  Our Mission
                </h3>
                <p className="text-sm text-gray-600">
                  Farm To Spoon is dedicated to revolutionizing the way local
                  farmers connect with consumers. We believe in creating a
                  sustainable food system that benefits both farmers and
                  consumers while strengthening our local communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">What We Do</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-semibold text-lg mb-3">For Farmers</h3>
            <ul className="text-gray-700 space-y-2">
              <li>Direct access to local customers</li>
              <li>Simple product listing management</li>
              <li>Flexible pickup point setup</li>
              <li>Fair pricing control</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">For Consumers</h3>
            <ul className="text-gray-700 space-y-2">
              <li>Access to fresh, local produce</li>
              <li>Convenient ordering process</li>
              <li>Multiple pickup locations</li>
              <li>Product reviews and ratings</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Our Impact</h3>
            <ul className="text-gray-700 space-y-2">
              <li>Supporting local agriculture</li>
              <li>Reducing food miles</li>
              <li>Building community connections</li>
              <li>Promoting sustainable farming</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Join Our Community Section */}
      <section className="grid md:grid-cols-2 items-center">
        {/* Left image */}
        <div>
          <img
            src={communityImage}
            alt="Join Community"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right content */}
        <div className="bg-green-100 p-10 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-700 mb-6 max-w-xl">
            Whether you're a local farmer looking to expand your reach or a
            consumer seeking fresh, locally-grown produce, Farm To Spoon
            welcomes you to join our growing community.
          </p>
          <div className="flex gap-4">
            <Link
              to="/register"
              className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
            >
              Register as Farmer
            </Link>
            <Link
              to="/"
              className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 transition"
            >
              Shop Local Produce
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
