import "./App.css";
import "./index.css";
import { useState } from "react";
import earth1 from "../src/assets/earth1.mp4";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data being sent:", formData);

    try {
      const response = await fetch("http://127.0.0.1:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Response from Flask API:", result);
      alert("Form submitted successfully!");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <div>
      <div className="relative min-h-screen">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src={earth1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Form Container */}
        <div className="flex items-center justify-center min-h-screen">
          <form
            onSubmit={handleSubmit}
            className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 shadow-md rounded-md w-96 z-10"
          >
            <h1 className="text-2xl font-bold mb-6 text-center text-white">
              React Form
            </h1>

            {/* Name Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-200 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-200 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-200 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#0f172a] text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
