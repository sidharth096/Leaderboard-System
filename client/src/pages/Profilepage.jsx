import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchPlayerById } from '../store/slice/playerSlice'; // Replace with your actual action

export const Profile = () => {
  const { id } = useParams(); // Get player ID from URL
  const dispatch = useDispatch();

  // Access player data from the Redux store
  const player = useSelector((state) => state.player.playerData);
  const loading = useSelector((state) => state.player.loading);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchPlayerById(id)); // Fetch player data by ID
//     }
//   }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center mt-8 text-gray-800">
      <div className="w-full max-w-4xl mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden">
        <h4 className="text-center text-2xl font-semibold text-orange py-4">
          Edit Player Score
        </h4>
        <div className="p-6">
          {player ? (
            <form>
              <div className="mb-4">
                <label className="block text-gray-600 font-bold mb-2">
                  Name:
                </label>
                <p className="text-gray-700">{player.name}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 font-bold mb-2">
                  Current Score:
                </label>
                <p className="text-gray-700">{player.score}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 font-bold mb-2">
                  New Score:
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Enter new score"
                  // Implement state and onChange to capture new score input
                />
              </div>
              <button
                type="submit"
                className="bg-orange text-white px-4 py-2 rounded-full"
              >
                Update Score
              </button>
            </form>
          ) : (
            <p>No player data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
