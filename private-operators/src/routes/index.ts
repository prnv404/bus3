import express, { Router } from "express";

import busRoute from "./bus.route";
import ticketRoute from "./ticket.route";
import pvtRoute from "./private.operator.route";
import { IDependencie } from "../config/dependency.config";

export = (dependencies: IDependencie) => {
	const router = express.Router();

	router.use("/pvt", pvtRoute(dependencies));

	router.use("/pvt/bus", busRoute(dependencies));

	router.use("/pvt/ticket", ticketRoute(dependencies));

	return router;
};
