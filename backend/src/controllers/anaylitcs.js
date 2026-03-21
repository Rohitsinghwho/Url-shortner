import { parse } from "dotenv";
import client from "../config/cache.js";


export const getStats=async(req,res)=>{
    const {shortCode}=req.params;
    try{
        const [total,cache,db]=await Promise.all([
            client.get(`hits:total:${shortCode}`),
            client.get(`hits:cache:${shortCode}`),
            client.get(`hits:db:${shortCode}`)
        ]);
        const t=parseInt(total) || 0;
        const c=parseInt(cache) || 0;
        const d=parseInt(db) || 0;

        const cacheHitRate = t > 0 ? ((c / t) * 100).toFixed(2) : "0.00";
       res.status(200).json({
        shortCode,
        totalHits:t,
        cacheHits:c,
        dbHits:d,
        cacheHitRate:`${cacheHitRate}%`
         })
    }catch(error){
        console.error("Error fetching stats: ",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}