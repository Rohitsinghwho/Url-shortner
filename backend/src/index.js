import dotenv from "dotenv";
dotenv.config();
import express from "express";
import urlRoutes from "./routes/url_routes.js"
// required for configuring the envirnoment variables(Senstive variables)
const app = express();

// required for parsing the json files
app.use(express.json());
app.use("/",urlRoutes)
// configure the server
app.listen(process.env.PORT, () => {
  // console.log( typeof process.env.DB_PASSWORD)
  console.log(`Server is listening on PORT ${process.env.PORT}`);
});
