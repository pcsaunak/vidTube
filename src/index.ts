/**
 * Keep index file totally separate so that it simply listens to
 * what is happening in other files
 */

import { app } from "./app";
import "dotenv/config";
import connectDb from "./db";

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is listening on Port:${PORT}`);
// });

// app.get("/", (req, res) => {
//   return res.json({ message: "OK" });
// });

connectDb()
  .then(() => {
    app.listen(() => {
      console.log(`Server is listening on Port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting DB", error);
  });
