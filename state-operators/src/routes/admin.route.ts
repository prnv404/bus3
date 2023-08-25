import { currentUser, requireAuth, validateRequest } from "@prnv404/bus3";
import express from "express";
import { signinValidation, signupValidation, verifyOtpValidation } from "./validator/validator";
import { IDependencies } from "../config/dependency.config";

export = (dependencies: IDependencies) => {
	const { adminController } = dependencies;

	const router = express.Router();

	router.post("/signup", signupValidation, validateRequest, adminController.Signup);
	router.post("/signin", signinValidation, validateRequest, adminController.Signin);
	router.delete("/signout", adminController.Signout);
	router.post("/verify-otp", verifyOtpValidation, validateRequest, adminController.VerifyOTP);
	router.get("/profile", currentUser, requireAuth, adminController.GetProfile);

	return router;
};
