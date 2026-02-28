import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from 'cors'
import urlRoutes from "./routes/url_routes.js"
import { connectRedis,disconnectRedis } from "./config/cache.js";
// required for configuring the envirnoment variables(Senstive variables)
const app = express();

export {app};
// required for parsing the json files
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))
app.use(express.json());
app.use("/",urlRoutes)
// configure the server


// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await disconnectRedis();
  process.exit(0);
});

let server;
async function startServer() {
  try {
    await connectRedis();
    server=app.listen(process.env.PORT, () => {
      // console.log( typeof process.env.DB_PASSWORD)
      console.log(`Server is listening on PORT ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}
export {server}

startServer();

