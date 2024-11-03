import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const player = await Player.findOne({ playerId: decoded.playerId });
      
      if (!player) throw new Error();
      
      req.token = token;
      req.player = player;
      next();
    } catch (error) {
      res.status(401).send({ error: 'Please authenticate.' });
    }
  };
  
  export default auth