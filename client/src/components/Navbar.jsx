import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {

    const navigate = useNavigate();
  return (
    <nav className="flex justify-center p-4 pt-7 ">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 shadow-md rounded-full bg-orange text-white">
        <div className="flex justify-around items-center p-3">
          <div>
            <button className="text-lg md:text-xl font-bold p-2 rounded-xl transition duration-200">
              Leaderboard
            </button>
          </div>
          <div>
            <button className="text-lg md:text-xl font-bold  p-2 rounded-xl transition duration-200" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
