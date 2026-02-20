import express from "express";
import dotenv from "dotenv";


dotenv.config();
const app=express();


// required for parsing the json files
app.use(express.json());




app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on PORT ${process.env.PORT}`)
})