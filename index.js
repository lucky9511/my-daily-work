import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './utils/db.js';

//import all routes
import userRoutes from './routes/user.routes.js';


dotenv.config();
const app = express();

// Middleware to parse JSON bodies//most impoertant part
app.use(  
cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send('lucky!');
});
console.log(process.env.PORT);

app.get("/lucky", (req, res) => {
  res.send('lucky!');
});

app.get("/cute", (req, res) => {
  res.send('cute!');
});
// Connect to the database
db();

// Use routes
app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
