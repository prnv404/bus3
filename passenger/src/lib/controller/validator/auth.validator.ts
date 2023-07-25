import { body } from "express-validator";

export const authvalidation = [
	body("name").notEmpty().trim().isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),
	body("phone").notEmpty().trim().isMobilePhone("en-IN").withMessage("Invalid phone number"),
	body("password").notEmpty().isString().withMessage("Password must be a valid string"),
	body("district").notEmpty().trim().isLength({ min: 2, max: 50 }).withMessage("District must be between 2 and 50 characters"),
	body("type").notEmpty().isIn(["student", "regular"]).withMessage("Invalid user type")
];

export const signinValidation = [
	body("phone").notEmpty().trim().isMobilePhone("en-IN").withMessage("Invalid phone number"),
	body("password").notEmpty().isString().withMessage("Password must be a valid string")
];

export const verifyValidation = [
	body("phone").notEmpty().trim().isMobilePhone("en-IN").withMessage("Invalid phone number"),
	body("otp").notEmpty().trim().isLength({ min: 4, max: 6 }).withMessage("OTP must be between 4 and 6 characters")
];
