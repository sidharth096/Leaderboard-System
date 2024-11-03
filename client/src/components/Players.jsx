import React from "react";

export const Players = () => {
  const players = [
    { id: 1, Rank: 1, name: "John Doe", score: 102 },
    { id: 2, Rank: 2, name: "Jane Smith", score: 99 },
    { id: 3, Rank: 3, name: "Sam Wilson", score: 95 },
    { id: 4, Rank: 4, name: "Lisa Brown", score: 92 },
    { id: 5, Rank: 5, name: "Mike Johnson", score: 90 },
    // Add more player objects here as needed
  ];

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
                  Name
                </th>
                <th className="px-6 py-3 border-b text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id} className="hover:bg-gray-100 transition duration-200">
                  <td className="px-6 py-4 border-b text-sm text-gray-600">
                    {player.Rank}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
