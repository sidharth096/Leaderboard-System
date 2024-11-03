import Player from "../models/player.js";

export const getLeaderBoardPlayers = async (req, res, next) => {
  try {
    const topPlayers = await Player.find()
      .sort({ score: -1, name: 1 })
      .limit(10)
      .select('-password');

    const playersWithRank = topPlayers.map((player, index) => ({
      ...player.toObject(), 
      rank: index + 1,
    }));

    console.log("===", playersWithRank);
    res.status(200).json(playersWithRank);
  } catch (error) {
    console.error(error); 
    next(error);
  }
};
