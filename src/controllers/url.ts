import { Request, Response, NextFunction } from "express"
import URL from "../models/url"

export const handleGenerateNewShortURL = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    if (!body?.url) return res.status(400).send({ error: "Redirect url is required" })

    const { nanoid } = await import("nanoid")
    const shortId = nanoid(4);
    // @ts-ignore
    const newUrl = await URL({
      shortId,
      redirectUrl: `${body.url}`,
      visitHistory: [],
    });
    const shortenedUrl = await newUrl.save();
    res.send({ shortenedUrl })
  } catch (err) {
    next(err)
  }
}

