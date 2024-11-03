import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../store/slice/userSlice";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  // Access player details from Redux store
  const user = useSelector((state) => state.user);

  // State to manage dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout handler
  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/login");
  };

  return (
    <nav className="flex justify-center p-4 pt-7">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 shadow-md rounded-full bg-orange text-white">
        <div className="flex justify-around items-center p-3">
          <div>
            <button
              className="text-lg md:text-xl font-bold p-2 rounded-xl transition duration-200"
              onClick={() => navigate("/leaderboard")}
            >
              Leaderboard
            </button>
          </div>

          <div className="relative" ref={dropdownRef}>
            {user.token ? (
              <div className="flex items-center space-x-4">
                <span
                  onClick={toggleDropdown}
                  className="bg-white text-black font-bold md:text-xl px-3 py-1 rounded-full cursor-pointer text-sm"
                >
                  {user.role === "admin" ? "Admin" : user.name.charAt(0).toUpperCase()}
                </span>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute left-0 top-10 mt-2 w-32  text-white font-bold rounded-md shadow-lg ">
                    {user.role === "player" && ( // Corrected the role check here
                      <button
                        className="w-full text-center px-4 py-2 bg-gray rounded-lg"
                        onClick={() => navigate("/profile")}
                      >
                        Profile
                      </button>
                    )}

                    <button
                      className="w-full text-center px-4 py-2 bg-gray rounded-lg "
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // If player is not logged in, show login button
              <button
                className="text-lg md:text-xl font-bold p-2 rounded-xl transition duration-200"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
