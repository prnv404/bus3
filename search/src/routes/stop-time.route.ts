import express from "express";
import { IDependencie } from "../config/depenency.config";
import { currentUser, requireAuth } from "@prnv404/bus3";

export = (dependencie: IDependencie) => {
	const { stopTimeController } = dependencie;
	const router = express.Router();
	router.post("/", currentUser, requireAuth, stopTimeController.createStopTime);
	router.get("/", currentUser, requireAuth, stopTimeController.findStopTimeOfTrip);
	router.get("/:id", currentUser, requireAuth, stopTimeController.findById);
	router.put("/:id", currentUser, requireAuth, stopTimeController.updateStopTime);
	router.delete("/:id", currentUser, requireAuth, stopTimeController.deleteStopTime);
	return router;
};
