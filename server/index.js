import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/route.js';
import connectDB from './config/db.js';


const app = express();
dotenv.config()
app.use(express.json());
app.use(cors());
app.use ((req,res,next) => {
    console.log(`request: ${req.method} ${req.url}`);
    next();
})

app.use("/",router)

app.use((req, res, next) => {
    res.status(404).send({ error: 'Route not found' });
  });


app.use((err, req, res, next) => {
    console.error(err.stack);
  
    const statusCode = err.status || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message || "Server error",
    });
  });
  


const PORT = process.env.SERVER_PORT || 3000;
await connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
});