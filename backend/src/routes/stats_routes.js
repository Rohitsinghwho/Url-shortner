import express from 'express';
import { getStats } from '../controllers/anaylitcs.js';

const router=express.Router();

router.get("/stats/:shortCode",getStats)

export default router;