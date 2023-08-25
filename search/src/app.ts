import "reflect-metadata";
import { NotFoundError, errorHandler } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import morgan from "morgan";
import cookieSession from "cookie-session";
import routes from "./routes";
import { dependency } from "./config/depenency.config";

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(cookieSession({ signed: false, secure: false }));

app.use(morgan("dev"));

app.use("/api/search", routes(dependency));

app.all("*", async (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export default app;
