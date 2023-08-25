import express from "express";
import { IDependencie } from "../config/depenency.config";
import { currentUser, requireAuth } from "@prnv404/bus3";

export = (dependencie: IDependencie) => {
	const { tripController } = dependencie;
	const router = express.Router();
	router.post("/", currentUser, requireAuth, tripController.createTrip);
	router.get("/all", currentUser, requireAuth, tripController.getAllTrips);
	router.get("/:id", currentUser, requireAuth, tripController.getTripById);
	router.patch("/:id", currentUser, requireAuth, tripController.updateTrip);
	router.delete("/:id", currentUser, requireAuth, tripController.deleteTrip);
	return router;
};
