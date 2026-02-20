import express from "express";
import dotenv from "dotenv";

// required for configuring the envirnoment variables(Senstive variables)
dotenv.config();
const app = express();

// required for parsing the json files
app.use(express.json());

// configure the server
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on PORT ${process.env.PORT}`);
});
