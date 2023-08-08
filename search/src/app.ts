import { NotFoundError, errorHandler } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import morgan from "morgan";
import { SearchRouter } from "./lib/controller/search.controller";

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/search", SearchRouter);

app.all("*", async (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export default app;
