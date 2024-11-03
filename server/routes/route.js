import express from 'express';
import { Login, playerRegister } from '../controller/atheController.js';
import { getLeaderBoardPlayers, getUserById, updateScore } from '../controller/playerController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post("/player/register", playerRegister)
router.post("/player/login", Login)
router.get('/player/:id',getUserById)
router.get("/players/leaderboard", getLeaderBoardPlayers)
router.patch("/player/updateScore", auth, updateScore)

export default router;
