import pool from "../config/db";

const createUrl=async (short_url,original_url)=>{
    const query=`
    INSERT INTO url_mapping (short_url,original_url)
    VALUES ($1,$2)
    RETURNING *;
    `;
    const values=[short_url,original_url];
    const result=await pool.query(query,values);
    return result.rows[0];
}


// FIND URL BY SHORT CODE
const getUrlByShortId=async(shortId)=>{
    const query=`
    SELECT * FROM url_mapping 
    WHERE id=$1;
    `;
    const result=await pool.query(query,[shortId]);
    return result.rows[0];
}

module.exports={
    createUrl,
    getUrlByShortId
}