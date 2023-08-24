import { currentUser, requireAuth, sanitizeData, validateRequest } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { busValidation, EditBusValidation } from "./validator/validator";
import { IDependencie } from "../config/dependency.config";

export = (dependencies: IDependencie) => {
	const { busController } = dependencies;

	const router = express.Router();

	router.post("/", sanitizeData, busValidation, validateRequest, currentUser, requireAuth, busController.createBus);

	router.put("/:id", sanitizeData, EditBusValidation, validateRequest, currentUser, requireAuth, busController.updateBus);

	router.get("/busno", currentUser, requireAuth, busController.getBusNo);

	router.get("/all", currentUser, requireAuth, busController.getBusAll);

	router.get("/:id", currentUser, requireAuth, busController.getBusById);

	router.delete("/:id", currentUser, requireAuth, busController.deleteBus);

	return router;
};
