import { Request, Response, NextFunction } from "express"
import URL from "../models/url"

export const handleGenerateNewShortURL = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    if (!body?.url || body.url.trim() == "") {
      throw new Error("invalid url");
    }

    const { nanoid } = await import("nanoid");
    const shortId = nanoid(4);
    // @ts-ignore
    const newUrl = await URL({
      shortId,
      redirectUrl: `${body.url}`,
      visitHistory: [],
    });
    const shortenedUrl = await newUrl.save();

    const urlList = await URL.find({});
    res.render("home", { id: shortId, urls: urlList })

  } catch (err: any) {
    if (err.message == "invalid url") {
      res.redirect("/");
    }
    next(err);
  }
}

export const handleGetAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shortId = req.params.shortId;
    if (!shortId) {
      res.status(404).send({ error: "no short id found in params" })
      return;
    }
    const entry = await URL.findOne({ shortId })
    res.json({
      totalClicks: entry?.visitHistory.length,
      analytics: entry?.visitHistory,
    });
  } catch (err) {
    next(err);
  }
}