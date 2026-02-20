import { Pool } from "pg";
async function connectDb(){
    try {
        const pool=new Pool({
                host:process.env.DB_HOST,
                user:process.env.DB_USER,
                password:process.env.DB_PASSWORD,
                port:process.env.DB_PORT,
                database:process.env.DB_NAME,
                max:20,
                idleTimeoutMillis:30000,
                connectionTimeoutMillis:2000,
                maxLifetimeSeconds:60
        });
        
    } catch (error) {
        console.log("Db connection failed ",error);
    }
}


export default connectDb;
