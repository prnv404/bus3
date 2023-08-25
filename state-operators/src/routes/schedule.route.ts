import { sanitizeData, validateRequest, currentUser, requireAuth } from "@prnv404/bus3";
import express from "express";
import { createScheduleValidation, assignDriverAndConductor } from "./validator/validator";
import { IDependencies } from "../config/dependency.config";

export = (dependencies: IDependencies) => {
	const router = express.Router();
	const { scheduleController } = dependencies;
	router.post("/", sanitizeData, createScheduleValidation, validateRequest, currentUser, requireAuth, scheduleController.createScheule);

	router.get("/", currentUser, requireAuth, scheduleController.FindByDepotCode);
	router.get("/all", currentUser, requireAuth, scheduleController.FindByDepotCode);
	router.patch("/edit/:id", sanitizeData, currentUser, requireAuth, scheduleController.EditSchedule);
	router.delete("/delete/:id", currentUser, requireAuth, scheduleController.DeleteScheule);
	router.post(
		"/assign",
		sanitizeData,
		assignDriverAndConductor,
		validateRequest,
		currentUser,
		requireAuth,
		scheduleController.AssignEmployee
	);
	router.get("/:id", currentUser, requireAuth, scheduleController.FindById);
	return router;
};
