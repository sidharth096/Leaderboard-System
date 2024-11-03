import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Player from '../models/player.js';
export const playerRegister = async (req, res,next) => {
  try {
    console.log(req.body);
    
    const { name, email, password } = req.body;

    const existingPlayer = await Player.findOne({ email });
    if (existingPlayer) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const player = new Player({
      name,
      email, 
      password: hashedPassword,
    });

    await player.save();

    const token = jwt.sign({ playerId: player._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', 
    });

    res.status(201).json({ player, token });
  } catch (error) {
      next(error);
  }
};


export const playerLogin = async (req, res,next) => {
    try {
      const { email, password } = req.body;
  
      const player = await Player.findOne({ email });
      if (!player) {
        return res.status(401).send({ message: "Invalid email or password." });
      }

      const isMatch = await bcrypt.compare(password, player.password);
      if (!isMatch) {
        return res.status(401).send({ message: "Invalid email or password." });
      }
  
      const token = jwt.sign({ playerId: player._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', 
      });
  
      res.status(200).json({ player, token });
    } catch (error) {
      next(error);
    }
  };
