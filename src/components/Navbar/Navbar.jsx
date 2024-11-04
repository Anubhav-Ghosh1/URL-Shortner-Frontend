import React, { useState } from "react"; // Import useState
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/operation/authAPI";

function Navbar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.profile);

  // State for managing dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleLogout() {
    dispatch(logout(token, navigate));
  }

  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-blue-400 text-white">
        {/* Logo Section */}
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => {
            if (token) {
              navigate(`/create/@${user?.username}`);
            }
          }}>
          URL Shortner
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {/* Conditionally render buttons based on the token */}
          {token ? (
            <div className="relative">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.username}`}
                alt=""
                className="w-10 rounded-full cursor-pointer"
                onClick={() => setIsDropdownOpen((prev) => !prev)} // Toggle dropdown
              />
              {isDropdownOpen && ( // Show dropdown if open
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg z-10">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                  >
                    Dashboard
                  </Link>
                  <Link className="block px-4 py-2 hover:bg-gray-200 w-full text-left" to={`/create/@${user?.username}`}>Manage URL</Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDropdownOpen(false); // Close dropdown after logout
                    }}
                    className="block px-4 py-2 hover:bg-gray-200 w-full text-left">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
