import express from 'express';
import { playerLogin, playerRegister } from '../controller/atheController.js';
import { getLeaderBoardPlayers } from '../controller/playerController.js';

const router = express.Router();

router.post ("/player/register",playerRegister)
router.post ("/player/login",playerLogin)
router.get ("/players/leaderboard",getLeaderBoardPlayers)

export default router;
