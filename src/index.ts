/**
 * Keep index file totally separate so that it simply listens to
 * what is happening in other files
 */

import app, { initExpress } from "./app";
import dotenv from "dotenv";
import connectDb from "./db";
import { error } from "console";

dotenv.config({
  path: "../.env",
});
const PORT: number | string = process.env.PORT || 3000;

connectDb()
  .then(() => {
    console.log("Inside then construct of Connect DB");
    // initExpress(PORT);
    app.listen(PORT, () => {
      console.log(`Server Initialisation complete`);
      console.log(`Server is listening on Port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error connecting DB`, error);
  });
