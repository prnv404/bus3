import "reflect-metadata";
import "dotenv/config";

import express, { Request, Response } from "express";
import cookieSession from "cookie-session";
import morgan from "morgan";
import { errorHandler, NotFoundError } from "@prnv404/bus3";
import routes from "./routes";
import { dependencies } from "./config/dependency.config";
const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(cookieSession({ signed: false, secure: false }));

app.use(morgan("dev"));

app.use("/api/srt", routes(dependencies));

app.all("*", async (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export default app;
