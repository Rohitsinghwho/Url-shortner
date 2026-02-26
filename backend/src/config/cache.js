import { createClient } from "redis";
import dotenv from "dotenv"

dotenv.config();

const redisUrl = process.env.NODE_ENV === 'test' 
  ? 'redis://localhost:6379'           // Tests: local Redis
  : process.env.REDIS_URL || 'redis://localhost:6379'; 

const client=createClient({
    url:redisUrl,
    socket: {
        connectTimeout: 10000,
        reconnectStrategy: (retries) => Math.min(retries * 100, 2000),
  },
});
if (process.env.NODE_ENV !== 'test') {
  client.connect().catch(err => {
    console.log('Redis unavailable - continuing without cache');
  });
}

client.on('error',err=>console.log('Redis client error',err));
client.on('connect', () => console.log('Redis connecting'));
client.on('ready', () => console.log('Redis connected successfully'));



let isConnected=false;
export const connectRedis=async()=>{
    if(isConnected||client.isOpen){
        console.log("Redis is already Connected")
        return;
    }
    try {
        await client.connect();
        isConnected=true;
    } catch (error) {
        console.error('Redis connection failed:', error);
        throw error;
    }
}

export const disconnectRedis = async () => {
  if (client.isOpen) {
    await client.quit();
    isConnected = false;
  }
};
export default client;