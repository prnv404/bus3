import "express-async-errors";
import "dotenv/config";

import express, { Request, Response } from "express";
import cookieSession from "cookie-session";
import morgan from "morgan";
import { errorHandler, NotFoundError } from "@prnv404/bus3";
import { PvtOperatorRouter } from "./lib/controller/pvt.operator.controllet";
import { BusRouter } from "./lib/controller/bus.controller";
import { TicketRouter } from "./lib/controller/ticket.controller";

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(cookieSession({ signed: false, secure: false }));

app.use(morgan("dev"));

app.use("/api/pvt", PvtOperatorRouter);

app.use("/api/pvt/bus", BusRouter);

app.use("/api/pvt/ticket", TicketRouter);

app.all("*", async (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export default app;
