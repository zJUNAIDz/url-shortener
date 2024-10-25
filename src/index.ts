import express from "express";
import path from "node:path";
import defaultRoute from "./routes/default";
import urlRoute from './routes/url';
import connectToMongoDB from './utils/connect';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("src/views"));

const PORT = process.env.PORT || 8000;

connectToMongoDB("mongodb://localhost:27017/url-shortener")
  .then(() => console.log("connected to DB..."))
  .catch(() => console.log("failed to connect to DB..."));

app.use('/', defaultRoute);
app.use('/url', urlRoute);



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  console.log(`server: http://localhost:${PORT}`);
});