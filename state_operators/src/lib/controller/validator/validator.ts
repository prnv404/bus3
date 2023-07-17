import { body } from "express-validator";

//  ADMIN CONTROLLER VALIDATION

export const signupValidation = [
	body("name").notEmpty().withMessage("Name is required"),
	body("password").notEmpty().withMessage("Password is required"),
	body("phone").notEmpty().withMessage("Phone number is required").isMobilePhone("en-IN").withMessage("Invalid phone number"),
	body("role").notEmpty().withMessage("Role is required"),
	body("Operator").notEmpty().withMessage("Operator is required")
];

export const signinValidation = [
	body("phone").notEmpty().withMessage("Phone number is required").isMobilePhone("en-IN").withMessage("Invalid phone number"),
	body("password").notEmpty().withMessage("Password is required")
];

export const verifyOtpValidation = [
	body("otp").notEmpty().withMessage("OTP is required"),
	body("phone").notEmpty().withMessage("Phone number is required").isMobilePhone("en-IN").withMessage("Invalid phone number")
];

// BUS CONRTROLLER VALIDATOIN

export const createBusValidation = [
	body("BusNo").notEmpty().withMessage("Bus number is required"),
	body("type").notEmpty().withMessage("Bus type is required"),
	body("depotCode").notEmpty().withMessage("Depot code is required"),
	body("seats").notEmpty().withMessage("Number of seats is required"),
	body("Operator").notEmpty().withMessage("Operator is required")
];

// DEPOT CONTROLLER VALIDATOIN
export const createDepotValidation = [
	body("depotCode").notEmpty().withMessage("Depot code is required"),
	body("district").notEmpty().withMessage("District is required"),
	body("name").notEmpty().withMessage("Depot name is required"),
	body("Operator").notEmpty().withMessage("Operator is required")
];

// EMPLOYEE CONTROLLER VALIDATON

export const createEmployeeValidation = [
	body("depotCode").notEmpty().withMessage("Depot code is required"),
	body("name").notEmpty().withMessage("Name is required"),
	body("phone").notEmpty().withMessage("Phone number is required"),
	body("type").notEmpty().withMessage("Type is required"),
	body("Operator").notEmpty().withMessage("Operator is required")
];

// SCHEDULE CONTROLLER VALIDATION

export const createScheduleValidation = [
	body("name").notEmpty().withMessage("Name is required"),
	body("BusNo").notEmpty().withMessage("Bus number is required"),
	body("start").notEmpty().withMessage("Start time is required"),
	body("stop").notEmpty().withMessage("Stop time is required"),
	body("route").notEmpty().withMessage("Route is required"),
	body("depotCode").notEmpty().withMessage("Depot code is required"),
	body("Operator").notEmpty().withMessage("Operator is required")
];
