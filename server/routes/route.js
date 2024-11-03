import express from 'express';
import { playerLogin, playerRegister } from '../controller/atheController.js';

const router = express.Router();

router.post ("/player/register",playerRegister)
router.post ("/player/login",playerLogin)

export default router;
