import express, { json, Request, Response, urlencoded } from "express";
import "dotenv/config";
import logger from "./logger";
import morgan from "morgan";
import cors from "cors";

const morganFormat = ":method :url :status :response-time ms";
// Create an Express application
const app = express();

// common middleware
app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

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

// Map the routes with the specific path
app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/sample", sampleRoute);

export { app };
