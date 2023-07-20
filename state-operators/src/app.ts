import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";

import express, { Request, Response } from "express";
import cookieSession from "cookie-session";
import morgan from "morgan";
import { errorHandler, NotFoundError } from "@prnv404/bus3";
import { DepotRouter } from "./lib/controller/depot.controller";
import { AdminRouter } from "./lib/controller/admin.controller";
import { EmployeeRouter } from "./lib/controller/employee.controller";
import { BusRouter } from "./lib/controller/bus.controller";
import { ScheduleRouter } from "./lib/controller/schedule.controller";

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(cookieSession({ signed: false, secure: false }));


app.use(morgan("dev"));


app.use("/api/srt/depot", DepotRouter);

app.use("/api/srt/admin", AdminRouter);

app.use("/api/srt/employee", EmployeeRouter);

app.use("/api/srt/bus", BusRouter);

app.use("/api/srt/schedule", ScheduleRouter);

app.all("*", async (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export default app;
