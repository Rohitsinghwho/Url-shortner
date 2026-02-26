import {describe,expect,test,beforeEach,afterEach} from "@jest/globals";
import { createUrl,getUrlByShortId,CheckExistingUrl,getUrlByID,UpdateWithShortCode } from "../src/models/url_model.js";
import pool from "../src/config/db.js";

describe("createUrl Database function",()=>{
    /** @beforeEach - Clean database before each test */
    beforeEach(async()=>{
        await pool.query("DELETE FROM url_mapping");
    });

   
    /** @Test 1 */

    test('Create URL and return Id', async() => { 
        const urlId= await createUrl("https://google.com");

        expect(urlId).toBeGreaterThan(0);
        expect(typeof urlId).toBe('number')

        // verify in db
        const result=await pool.query("SELECT * FROM url_mapping WHERE Id = $1",[urlId])
        expect(result.rows[0].original_url).toBe('https://google.com');
     })

     

     /**@Test3 - Handle long Url */
     test('handle long Url', async() => { 
        const longUrl='https://'.repeat(100)+'example.com';
        const urlId=await createUrl(longUrl);

        expect(urlId).toBeGreaterThan(0);
      })

})


describe("Get Url by shortId Database function",()=>{
    beforeEach(async()=>{
        await pool.query("DELETE FROM url_mapping");
    });

    test("Get url by shortId",async()=>{
        const urlId=await createUrl('https://google.com');
        const url=await getUrlByShortId(urlId);

        expect(url).toBeDefined();
        expect(url.id).toBe(urlId);
        expect(url.original_url).toBe('https://google.com');
    })

    test("Return null for non-existent id",async()=>{
        const url =await getUrlByShortId(99999999);
        expect(url).toBeNull();
    })
})

