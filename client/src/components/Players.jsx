import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPlayers } from '../store/slice/leaderboardSlice'; // Adjust the path as needed

export const Players = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the players and loading state from the Redux store
  const leaderBordPlayers = useSelector((state) => state.leaderBoard.players);
  const loading = useSelector((state) => state.leaderBoard.loading);

  // Debugging logs
  console.log("Loading:", loading);
  console.log("Players:", leaderBordPlayers);

  useEffect(() => {
    dispatch(fetchPlayers()); // Dispatch the action to fetch players data
  }, [dispatch]); 

  return (
    <div className="flex justify-center items-center mt-8 text-gray-800">
      <div className="w-full max-w-4xl mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden">
        <h4 className="text-center text-2xl font-semibold text-orange py-4">
          Player Rankings
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-6 py-3 border-b text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 border-b text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  id
                </th>
                <th className="px-6 py-3 border-b text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Loading players...
                  </td>
                </tr>
              ) : leaderBordPlayers.length ? (
                leaderBordPlayers.map((player) => (
                  <tr key={player.id} className="hover:bg-gray-100 transition duration-200">
                    <td className="px-6 py-4 border-b text-sm text-gray-600 font-bold">
                      {player.rank}
                    </td>
                    <td className="px-6 py-4 border-b text-sm text-gray-600 font-bold">
                      {player._id}
                    </td>
                    <td className="px-6 py-4 border-b text-sm text-gray-600">
                      {player.name}
                    </td>
                    <td className={`px-6 py-4 border-b text-sm font-medium ${player.score > 95 ? 'text-green-600' : 'text-gray-600'}`}>
                      {player.score}
                    </td>
                    <td className="px-6 py-4 border-b text-right">
                      <button className="bg-indigo-600 text-white py-1 px-3 rounded hover:bg-indigo-800 transition duration-200">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                // Show message when there are no players
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No players...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
