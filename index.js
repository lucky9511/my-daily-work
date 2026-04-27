import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
    
dotenv.config();
const app = express();
app.use(  
cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
