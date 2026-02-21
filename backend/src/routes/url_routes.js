import express from "express";
import {getLongUrl, RedirectUser} from "../controllers/url_converter.js"
const router=express.Router();

router.post('/shorten',getLongUrl);
router.get('/:shortCode',RedirectUser);
export default router;