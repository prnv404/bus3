import express from "express";
import { IDependencie } from "../config/depenency.config";
import { currentUser, requireAuth } from "@prnv404/bus3";

export = (dependencie: IDependencie) => {
	const { stopController } = dependencie;
	const router = express.Router();
	router.post("/create", currentUser, requireAuth, stopController.createStop);
	router.get("/all", currentUser, requireAuth, stopController.getAllStops);
	router.get("/:id", currentUser, requireAuth, stopController.getStopById);
	router.patch("/:id", currentUser, requireAuth, stopController.updateStop);
	router.delete("/:id", currentUser, requireAuth, stopController.deleteStop);
	return router;
};
