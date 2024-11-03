import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { playerLogin } from "../store/slice/playerSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [role, setRole] = useState("player");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = { email: "", password: "" };

    // Validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/player/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, role }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      toast.success("Login successful!");


      dispatch(playerLogin(data));
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setErrors({ email: "", password: "" });
    }
  };

  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-white text-black">
      <ToastContainer />
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-center font-semibold text-orange text-5xl sm:text-6xl">
          Login
        </h1>

        <form
          className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Login as:
            </label>
            <div className="mt-2 flex justify-around">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="player"
                  className="mr-2"
                  checked={role === "player"}
                  onChange={() => setRole("player")}
                />
                Player
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  className="mr-2"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                />
                Admin
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full mt-2 px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full mt-2 px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="w-full rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray focus:outline focus:ring-2 focus:ring-orange"
            >
              Login
            </button>
          </div>
        </form>

        {role === "player" && (
          <div className="text-center mt-4">
            <p className="text-gray-600">Not registered?</p>
            <button
              className="text-orange underline"
              onClick={() => navigate("/register")}
            >
              Register here
            </button>
          </div>
        )}
      </div>
    </main>
  );
};
