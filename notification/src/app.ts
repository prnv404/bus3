import { NotFoundError, errorHandler } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import morgan from "morgan";

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(morgan("dev"));

app.all("*", async (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export default app;
