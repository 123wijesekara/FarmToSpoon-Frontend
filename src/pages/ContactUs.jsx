import React, { useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
    issue: "",
  });

  const [loading, setLoading] = useState(false);

  // Email validation regex
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check email before submit
    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    console.log("response", formData);
    try {
      const response = await Axios({
        ...SummaryApi.contactForm,
        data: formData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message || "Message sent successfully!");
        setFormData({ name: "", email: "", feedback: "", issue: "" });
      } else {
        toast.error(responseData.message || "Something went wrong");
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-12 px-6 md:px-20">
      <div className="text-center mb-12">
        <p className="text-lg font-semibold">Call us: +11 188 888</p>
        <p className="text-gray-700">Email us: admin@gmail.com</p>
        <p className="text-gray-700">
        No. 45, Galle Road, Bambalapitiya, Colombo 04, Sri Lanka
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Share Your Feedback
              </label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="Enter feedback"
                rows="4"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Report an Issue
              </label>
              <textarea
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                placeholder="Enter issue"
                rows="4"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63313.25556711609!2d79.815005!3d6.927078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2591cddc2b11f%3A0x93a67a8f9b2828d3!2sColombo!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
