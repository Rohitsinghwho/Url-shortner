

const BASEB2='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
/**
 * 
 * @param {Number} databaseId 
 * @returns {String} result - Encoding of the Database Id
 */

export const encodeBase62=(databaseId)=>{
    // base62 encoding
    //repeatedly divide the number by 62 and store the rem
    
    if(databaseId===0)return "0";
    let result="";

    
    while(databaseId>0){
        result=BASEB2[databaseId%62]+result;
        databaseId=Math.floor(databaseId/62);
    }
    return result||"0";
}


/**
 * 
 * @param {String} encodedBase62 
 * @returns {Number} num - Decoded databaseId
 */
export const decodeBase62=(encodedBase62)=>{
    let num=0;

    for(let i=0;i<encodedBase62.length;i++){
        num=num*62+BASEB2.indexOf(encodedBase62[i])
    }
    return num;
}