import express from "express";
import { currentUser, requireAuth, validateRequest, sanitizeData } from "@prnv404/bus3";
import { createBusValidation } from "./validator/validator";
import { IDependencies } from "../config/dependency.config";

export = (dependencies: IDependencies) => {
	const { busController } = dependencies;
	const router = express.Router();
	router.post("/", sanitizeData, createBusValidation, validateRequest, currentUser, requireAuth, busController.CreateBus);
	router.get("/all", currentUser, requireAuth, busController.GetAllBus);
	router.patch("/edit/:id", sanitizeData, currentUser, requireAuth, busController.EditBus);
	router.delete("/delete/:id", currentUser, requireAuth, busController.DeleteBus);
	router.get("/:id", currentUser, requireAuth, busController.GetBus);
	return router;
};
