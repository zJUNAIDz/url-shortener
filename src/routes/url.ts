import express from "express";
import { handleGenerateNewShortURL, handleGetAnalytics } from "../controllers/url";
const router = express.Router();

router.post('/', handleGenerateNewShortURL)
router.post('/analytics/:shortId', handleGetAnalytics)
export default router;