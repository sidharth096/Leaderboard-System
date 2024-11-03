import React from "react";
import { Register } from "../components/Register";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {

    const navigate = useNavigate();
  return (
    <>
      {" "}
      <div className="p-7 ">
        <button
          onClick={() => navigate("/")}
          className="mt-4 ml-4 text-orange font-semibold hover:underline"
        >
          Back to Leaderboard
        </button>
      </div>
      <Register />
    </>
  );
};
