import Player from "../models/player.js";
import { playerRegister } from "./atheController.js";

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
export const updateScore = async (req, res, next) => {
  try {
    console.log("======",req.body);

    const { id, newScore } = req.body;
 console.log(id)
 console.log(typeof newScore)
    // Validate the newScore value
    if (typeof newScore !== 'number' || newScore < 0) {
      console.log(1)
      return res.status(400).json({ error: 'Invalid score value' });
    }

    // Check authorization
    if (req.user.role !== 'admin' && id !== req.user._id.toString()) {
      
      return res.status(403).json({ error: 'Not authorized to update this score' });
    }

    // Find the player by ID
    const player = await Player.findOne({ _id: id }); // Use `_id` for querying
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    console.log(player);
    

    console.log('Player before update:', player);

    // Update the player's score and timestamp
    player.score = newScore;
    player.timestamp = new Date(); // Set the current timestamp

    const updatedPlayer = await player.save(); // Save the updated player
    console.log('Updated Player:', updatedPlayer);

    res.status(200).json({ success: true, player: updatedPlayer });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Fetch the user by ID, excluding the password field
    const player = await Player.findById(id).select('-password');
    
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    res.status(200).json(player);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

