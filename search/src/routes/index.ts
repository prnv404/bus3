import express from "express";
import { IDependencie } from "../config/depenency.config";
import tripRoute from "./trip.route";
import stopRoute from "./stop.route";
import stopTimeRoute from "./stop-time.route";
import searchRoute from "./search.route";
import routeRoute from "./route.route";

export = (dependencie: IDependencie) => {
	const router = express.Router();
	router.use("/", searchRoute(dependencie));
	router.use("/stop", stopRoute(dependencie));
	router.use("/stoptime", stopTimeRoute(dependencie));
	router.use("/trip", tripRoute(dependencie));
	router.use("/route", routeRoute(dependencie));
	return router;
};
