import express from "express";
import { IDependencies } from "../config/dependency.config";
import adminRoute from "./admin.route";
import depotRoute from "./depot.route";
import employeeRoute from "./employee.route";
import scheduleRoute from "./schedule.route";
import ticketRoute from "./ticket.route";
import busRoute from "./bus.route";

export = (dependencies: IDependencies) => {
	const router = express.Router();
	router.use("/depot", depotRoute(dependencies));
	router.use("/admin", adminRoute(dependencies));
	router.use("/ticket", ticketRoute(dependencies));
	router.use("/schedule", scheduleRoute(dependencies));
	router.use("/employee", employeeRoute(dependencies));
	router.use("/bus", busRoute(dependencies));
	return router;
};
