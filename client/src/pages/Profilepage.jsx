import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setUserData } from "../store/slice/userSlice";

const ProfilePage = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch()
  const [score, setScore] = useState(0);
  const [userData, setUserData] = useState(null); // State to store user details
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Access player token and initial score from Redux store
  const user = useSelector((state) => state.user);
  const { token } = user;

  // Fetch data only if an id is present
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/player/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch player data");
        }

        const data = await response.json();
        setUserData(data);
        setScore(data.score); // Set score based on fetched data
      } catch (err) {
        setError(err.message);
      }
    };

    if (id) {
      fetchUserData();
    } else {
      setScore(user.score); // Set score from Redux store if id is not present
      setUserData(user); // Use Redux user data if no id in URL
    }
  }, [id, token, user]);

  const handleScoreChange = (event) => {
    setScore(Number(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/player/updateScore`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newScore: score, id: id || user.id }), // Use URL id if available, otherwise Redux user id
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update score");
      }

      const data = await response.json();
      if(data){
        setUserData((prevData) => ({ ...prevData, score: data.player.score }));
        // dispatch(setUserData(userData)); 
      }
      console.log("==========",data);
      
      setSuccess("Score updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <h2 className="text-center text-2xl font-semibold text-orange py-4">
          User Profile
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        {userData ? (
          <>
            <div className="p-6">
              <h3 className="text-lg font-semibold">
                Name: {userData.name}
              </h3>
              <p className="text-gray-700">Email: {userData.email}</p>
              <p className="text-gray-700">Current Score: {userData.score}</p>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="score"
                >
                  Update Score
                </label>
                <input
                  type="number"
                  id="score"
                  value={score}
                  onChange={handleScoreChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter new score"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-orange text-white font-bold py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
                >
                  Update Score
                </button>
              </div>
            </form>
          </>
        ) : (
          <p className="text-center text-gray-700">Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
