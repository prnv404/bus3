import "reflect-metadata";
import { NotFoundError, errorHandler } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import morgan from "morgan";
import { SearchRouter } from "./lib/controller/search.controller";
import { RouteRouter } from "./lib/controller/router.controller";
import { StopRouter } from "./lib/controller/stop.controller";
import { TripRouter } from "./lib/controller/trip.controller";
import cookieSession from "cookie-session";
import { StopTimeRouter } from "./lib/controller/stop.time.controller";

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(cookieSession({ signed: false, secure: false }));

app.use(morgan("dev"));

app.use("/api/search", SearchRouter);

app.use("/api/search/stop", StopRouter);

app.use("/api/search/stoptime", StopTimeRouter);

app.use("/api/search/trip", TripRouter);

app.use("/api/search/route", RouteRouter);

app.all("*", async (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export default app;
