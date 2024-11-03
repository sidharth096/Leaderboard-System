import jwt from "jsonwebtoken";
import Player from "../models/player.js";
import Admin from "../models/Admin.js";

const auth = async (req, res, next) => {
  try {
    console.log("HAI")
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(token);
    console.log(decoded);
    
    
    
    // Check if the user is a player or admin based on the decoded role
    let user;
    if (decoded.role === 'player') {
      user = await Player.findOne({ _id: decoded.userId }); // Use the correct key based on your token payload
    } else if (decoded.role === 'admin') {
      user = await Admin.findOne({ _id: decoded.userId });
    }

    if (!user) throw new Error("un authorized user");

    req.token = token;
    req.user = user;
    req.user.role = decoded.role // Rename to user since it can be either player or admin
    next();
  } catch (error) {
      next(error)
  }
};

export default auth;
