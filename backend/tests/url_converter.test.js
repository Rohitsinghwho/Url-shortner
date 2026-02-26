import { describe, test, expect, beforeEach, afterAll } from "@jest/globals";
import request from "supertest";
import { app, server } from "../src/index.js";
import pool from "../src/config/db.js";
import client, { disconnectRedis } from "../src/config/cache.js";
import { isValidShortCode } from "../src/utils/isValidShortC.js";

describe("Url Shortener Controllers", () => {
  
  beforeEach(async () => {
    const timeoutPromise = Promise.race([
      (async () => {
        try {
          await pool.query("DELETE FROM url_mapping");
          await client.flushAll();
        } catch (error) {
          console.log('Cleanup failed:', error.message);
        }
      })(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Cleanup timeout')), 10000)
      )
    ]);
    await timeoutPromise;
  }, 15000);
client;
  afterAll(async () => {
    server.close();
    await pool.end();
    await disconnectRedis();
  });

  describe('POST /shorten', () => {
    test('create new short URL', async () => {
      const response = await request(app)
        .post('/shorten')
        .send({ originalUrl: "https://google.com" })
        .expect(200);

      expect(response.body).toHaveProperty('shortUrl');
      expect(response.body.shortUrl).toMatch(/http:\/\/localhost:\d+\/[a-z0-9]+/i);
      expect(response.body.message).toBe('Url Creation Success!');
    });

    test('returns existing URL for duplicates', async () => {
      // 1. Create first URL
      const firstResponse = await request(app)
        .post('/shorten')
        .send({ originalUrl: "https://google.com" })
        .expect(200);

      // 2. Create duplicate - should return SAME shortUrl
      const secondResponse = await request(app)
        .post('/shorten')
        .send({ originalUrl: "https://google.com" })
        .expect(200);

      expect(secondResponse.body.shortUrl).toBe(firstResponse.body.shortUrl);
      expect(secondResponse.body.message).not.toBe('Url Creation Success!');
    });

    test('400 - missing originalUrl', async () => {
      const response = await request(app)
        .post('/shorten')
        .send({})
        .expect(400);

      expect(response.body.message).toBe("Original Url is required"); // Fixed typo
    });

    test('400 - invalid URL format', async () => {
      const response = await request(app)
        .post('/shorten')
        .send({ originalUrl: "localhost45" })
        .expect(400);

      expect(response.body.message).toBe('Invalid Url Format');
    });
  });

  describe('GET /:shortCode', () => {
    test('redirect via Redis cache (hit)', async () => {
      // Create URL first
      const response = await request(app)
        .post('/shorten')
        .send({ originalUrl: "https://cached.com" })
        .expect(200);

      const shortCode = response.body.shortUrl.split('/').pop();

      // Test redirect (Redis hit)
      await request(app)
        .get(`/${shortCode}`)
        .expect(301)
        .expect('Location', 'https://cached.com');
    });

    test('redirect by postgres (cache miss)', async () => {
      const createRes = await request(app)
        .post('/shorten')
        .send({ originalUrl: "https://postgres.com" })
        .expect(200);

      const shortCode = createRes.body.shortUrl.split('/').pop();

      // Clear Redis cache
      await client.flushAll();

      // Test Postgres fallback
      await request(app)
        .get(`/${shortCode}`)
        .expect(301)
        .expect('Location', 'https://postgres.com');
    });

    test('400 - Invalid shortCode', async () => {
      const response = await request(app)
        .get('/invalid12')
        .expect(400);

      expect(response.body.message).toBe("Invalid short code format");
    });

    // test('404 - missing shortCode', async () => {
    //   const response = await request(app)
    //     .get('/')
    //     .expect(404);

    //   expect(response.body.message).toBe('Short code is required'); // Fixed typo
    // });
  });
});
