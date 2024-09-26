import express from "express";
import connectToMongoDB from './utils/connect';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

connectToMongoDB("mongodb://localhost:27017/url-shortener")
  .then(() => console.log("connected to DB..."))
  .catch(() => console.log("failed to connect to DB..."));




app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});