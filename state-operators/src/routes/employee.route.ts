import { sanitizeData, validateRequest, currentUser, requireAuth } from "@prnv404/bus3";
import express from "express";
import { createEmployeeValidation } from "./validator/validator";
import { IDependencies } from "../config/dependency.config";

export = (dependencies: IDependencies) => {
	const router = express.Router();
	const { employeeController } = dependencies;
	router.post(
		"/",
		sanitizeData,
		createEmployeeValidation,
		validateRequest,
		currentUser,
		requireAuth,
		employeeController.createEmployee
	);
	router.get("/all", currentUser, requireAuth, employeeController.GetAllEmployee);
	router.patch("/edit/:id", sanitizeData, currentUser, requireAuth, employeeController.EditEmployee);
	// router.get("/:id", currentUser, requireAuth,employeeController.);
	router.delete("/delete/:id", currentUser, requireAuth, employeeController.DeleteEmployee);
	return router;
};
