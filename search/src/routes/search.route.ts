import express from "express";
import { IDependencie } from "../config/depenency.config";
import { currentUser, requireAuth } from "@prnv404/bus3";

export = (dependencie: IDependencie) => {
	const { searchController } = dependencie;
	const router = express.Router();
	router.get("/", currentUser, requireAuth, searchController.searchTrips);
	router.get("/stoptime", currentUser, requireAuth, searchController.getStopTimes);
	router.get("/route", currentUser, requireAuth, searchController.getTripsByRoute);
	return router;
};
