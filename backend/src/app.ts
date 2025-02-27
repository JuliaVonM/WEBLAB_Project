import {config} from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import {errorHandler, notFound} from "./middleware/middleware";
import bodyParser from "body-parser";
import categoryRoutes from "./routes/category.routes";
import ringRoutes from "./routes/ring.routes";
import technologyRoutes from "./routes/technology.routes";

config();

const app = express();
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/categories", categoryRoutes)
app.use("/api/rings", ringRoutes)
app.use("/api/technologies", technologyRoutes)

app.use(notFound);
app.use(errorHandler);

export default app;