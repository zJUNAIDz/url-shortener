import connectToMongoDB from './connect';
import urlRoute from './routes/url'
import URL from './models/url';
import express from "express";
import path from "node:path"

const app = express();
app.use(express.json());
app.use('/url', urlRoute);

const PORT = process.env.PORT || 8000;

connectToMongoDB("mongodb://localhost:27017/url-shortener")
  .then(() => console.log("connected to DB..."))
  .catch(() => console.log("failed to connect to DB..."));


app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({ shortId }, {
    $push: {
      visitHistory: { timestamp: Date.now() },
    },
  });
  if (!entry) {
    res.status(404).send({ error: "short id not found" });
    return;
  }
  console.log(entry);
  res.redirect(entry?.redirectUrl);
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});