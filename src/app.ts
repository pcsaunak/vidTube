import express, { json, Request, Response, urlencoded } from "express";
import "dotenv/config";
import logger from "./logger";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

const morganFormat = ":method :url :status :response-time ms";
// Create an Express application
const app = express();

// common middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

/**
 * Custom Middle ware
 */

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Import the Routes
import healthCheckRouter from "./routes/healthCheck.routes";
import sampleRoute from "./routes/sample.routes";
import userRouter from "./routes/user.routes";

// Map the routes with the specific path
app.use("/api/v1/healthcheck", healthCheckRouter);

app.use("/api/v1/sample", sampleRoute);

app.get("/api/v1/test", (req, res) => {
  return res.json({ message: "Ok from test message" });
});

app.use("/api/v1/users", userRouter);

const initExpress = async (port: number | string) => {
  try {
    console.log("Inside Init Express, port number passed:", port);
    app.listen(port, () => {
      `Server is running on Port: ${port}`;
    });
  } catch (error) {
    console.log("Error trying to listen to Port", error);
  }
};
export { initExpress };

export default app;
