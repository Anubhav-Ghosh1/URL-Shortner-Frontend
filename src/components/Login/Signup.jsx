import React, { useState, useRef } from "react";
import axios from "axios";
import { RxAvatar } from "react-icons/rx";
import { RiCompassDiscoverFill } from "react-icons/ri";
import { FaRegImages } from "react-icons/fa";
import { FaUserCircle, FaImage, FaMapMarkerAlt } from "react-icons/fa"; // Import icons
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../services/operation/authAPI";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file selection using useRef
  const handleFileSelect = (ref) => {
    ref.current.click(); // Trigger the hidden file input
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Create form data object for sending files
    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("password", formData.password);
    try {
      await dispatch(signup(formDataToSend, navigate));
      setSuccessMessage("User registered successfully!");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error registering user"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 mt-24 rounded-lg lg:shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        {/* Display success or error messages */}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="">
          {/* Full Name */}

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="flex w-full justify-between">
            {/* Username */}
            <div className="w-full mb-4">
              <label className="block mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold px-3 py-2 rounded hover:bg-[#fbc900] hover:scale-95 transition-all ease-in duration-200">
            Signup
          </button>
        </form>
        <div>
          <Link to="/login">
            <p className="text-center mt-4">
              Create Have Account?{" "}
              <span className="text-blue-600 font-semibold">Login</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
