import express from "express";

import { currentUser, requireAuth, sanitizeData, validateRequest } from "@prnv404/bus3";

import { container } from "tsyringe";
import { PvtOperatorSigninValidaton, OtpValidation } from "./validator/validator";
import { IDependencie } from "../config/dependency.config";

export = (dependencies: IDependencie) => {
	const { pvtController } = dependencies;

	const router = express.Router();

	router.post("/signin", sanitizeData, PvtOperatorSigninValidaton, validateRequest, pvtController.signin);

	router.delete("/signout", currentUser, requireAuth, pvtController.signout);

	router.post("/verifyOtp", OtpValidation, validateRequest, pvtController.verifyOtp);

	router.get("/profile", currentUser, requireAuth, pvtController.getProfile);

	return router;
};
