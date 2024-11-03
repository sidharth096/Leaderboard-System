import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Player from '../models/player.js';
import Admin from '../models/Admin.js';
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


export const  Login = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    // Check if the role is 'admin' or 'player'
    const { role } = req.body; // Assume role is included in the request body

    let user;
    if (role === 'admin') {
      // Search in the Admin database
      user = await Admin.findOne({ email });
      if (!user) {
        return res.status(401).send({ message: "Invalid email or password." });
      }
    } else if (role === 'player') {
      // Search in the Player database
      user = await Player.findOne({ email });
      if (!user) {
        return res.status(401).send({ message: "Invalid email or password." });
      }
    } else {
      return res.status(400).send({ message: "Invalid role." });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role:role }, process.env.JWT_SECRET, {
      expiresIn: '1h', 
    });

    // Send response
    res.status(200).json({ user: { ...user._doc,role, password: undefined }, token });
  } catch (error) {
    next(error);
  }
};



