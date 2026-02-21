import pool from "../config/db.js";

export const createUrl=async (original_url)=>{
    const query=`
    INSERT INTO url_mapping (original_url)
    VALUES ($1)
    RETURNING *;
    `;
    const values=[original_url];
    const result=await pool.query(query,values);
    return result.rows[0].id;
}


// FIND URL BY SHORT CODE
export const getUrlByShortId=async(shortId)=>{
    const query=`
    SELECT * FROM url_mapping 
    WHERE id=$1;
    `;
    const result=await pool.query(query,[shortId]);
    return result.rows[0];
}

export const CheckExistingUrl=async(Url)=>{
    const query=`
    SELECT short_url FROM url_mapping 
    WHERE original_url=$1;
    `;
    const result=await pool.query(query,[Url]);
    return [result.rows[0],result.rowCount];
    // return result.rows[0]
}

export const getUrlByID=async(Id)=>{
    const query=`
    SELECT * FROM url_mapping
    WHERE id=$1;
    `;
    const result=await pool.query(query,[Id]);
    // console.log("Rows Updated:", result.rowCount);
    return result.rows[0];
}

export const UpdateWithShortCode=async(shortIdCode,id)=>{
    const query=`
    UPDATE url_mapping SET short_url=$1
    WHERE id=$2;
    `;
    const result=await pool.query(query,[shortIdCode,id]);
    return result.rows[0];
}

