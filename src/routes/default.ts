import express, { Request, Response } from "express";
import URL from "../models/url";
const router = express.Router();

router.get('/url', async (req: Request, res: Response) => {
  const urls = await URL.find({});
  res.render("home", { urls });
})

router.get('/url/:shortId', async (req, res) => {
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

export default router;