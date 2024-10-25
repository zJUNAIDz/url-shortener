import express from "express";
import { handleGenerateNewShortURL, handleGetAnalytics } from "../controllers/url";
const router = express.Router();
//@ts-ignore

router.post('/url', handleGenerateNewShortURL);
router.post('/analytics/:shortId', handleGetAnalytics)
export default router;