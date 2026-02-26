import {CheckExistingUrl,getUrlByID,createUrl,UpdateWithShortCode,getUrlByShortId} from "../models/url_model.js";
import {encodeBase62,decodeBase62} from "../utils/hashFunc.js";
import client from "../config/cache.js";
import { isValidShortCode } from "../utils/isValidShortC.js";


// for getting the long url and converting to short_url
/**
 * Create a short URL
 *
 * @param {import('express').Request<{}, {}, { originalUrl: string }>} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
export const getLongUrl=async(req,res)=>
{
    try {
        const originalUrl=req.body.originalUrl;
        if(!originalUrl){
            return res.status(400).json({message:"Original Url is required"});
        }
    
        // Basic Url Validations
        const urlPattern = /^(https?:\/\/)/;
        if(!urlPattern.test(originalUrl)){
            return res.status(400).json({message:"Invalid Url Format"});
        }
        let ExistingShortUrl=await CheckExistingUrl(originalUrl)
        if(ExistingShortUrl[1]>0){
            return res.status(200).json({
                shortUrl:`${process.env.BASE_URL}/${ExistingShortUrl[0].short_url}`
            })
        }
    
        // Insert Original url and get generated Id
        const ID=await createUrl(originalUrl);
        // console.log("ID After createUrl: ",ID);
        // const id=await getUrlID(originalUrl);
    
        // Encode id to base62 
        const shortIdCode=encodeBase62(ID);
        // console.log("ShortCode after encoding: ",shortIdCode)
        // Update Record with short Url
        const UpdateRecord= await UpdateWithShortCode(shortIdCode,ID);
        // console.log("Updated recoreds: ",UpdateRecord);
        await client.set(`url:${shortIdCode}`,originalUrl,{
            EX: 86400 * 30 
        })
        res.status(200).json({
            message:"Url Creation Success!",
            shortUrl:`${process.env.BASE_URL}/${shortIdCode}`
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}



export const RedirectUser=async (req,res)=>{
    // receive shortcode in params
    const {shortCode}=req.params;
    let originalUrl;
    try {
        if (shortCode === undefined || shortCode === null || shortCode === '') {
           return res.status(404).json({ message:"Short code is required" });
       }
       
       if(!isValidShortCode(shortCode)){
            return res.status(400).json({message:"Invalid short code format"});
       }
       
        originalUrl=await client.get(`url:${shortCode}`);
        if(originalUrl){
            return res.redirect(301, originalUrl);
        }
           // 2. SLOW: Postgres lookup via ID
        const decodedId = decodeBase62(shortCode);
        const result = await getUrlByID(decodedId);
        
        if (!result || !result.original_url) {
            return res.status(404).json({ message: "URL not found" });
        }

        originalUrl = result.original_url;
        
        // 3. Cache MISS → Populate Redis for next request
        await client.set(shortCode, originalUrl, { EX: 86400 * 30 }); // 30 days
        return res.redirect(301, originalUrl);

    } catch (error) {
        console.error('Redirect error:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}