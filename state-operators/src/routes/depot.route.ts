import { sanitizeData, validateRequest, currentUser, requireAuth } from "@prnv404/bus3";
import express from "express";
import { createDepotValidation } from "./validator/validator";
import { IDependencies } from "../config/dependency.config";

export = (dependencies: IDependencies) => {
	const router = express.Router();
	const { depotController } = dependencies;

	router.post("/", sanitizeData, createDepotValidation, validateRequest, currentUser, requireAuth, depotController.createDepot);
	router.get("/all", currentUser, requireAuth, depotController.GetAllDepot);
	router.get("/:id", currentUser, requireAuth, depotController.GetDepotById);
	router.patch("/edit/:id", sanitizeData, currentUser, requireAuth, depotController.EditDepot);
	router.delete("/delete/:id", currentUser, requireAuth, depotController.EditDepot);

	return router;
};
