import { body } from "express-validator";

export const PvtOperatorValidation = [
	body("name").notEmpty().withMessage("Name is required").isLength({ max: 255 }).withMessage("Name should not exceed 255 characters"),

	body("phone")
		.notEmpty()
		.withMessage("Phone number is required")
		.isLength({ min: 10, max: 10 })
		.withMessage("Phone number should be 10 digits"),

	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 6 })
		.withMessage("Password should be at least 6 characters"),

	body("district")
		.notEmpty()
		.withMessage("District is required")
		.isLength({ max: 255 })
		.withMessage("District should not exceed 255 characters")
];

export const PvtOperatorSigninValidaton = [
	body("phone")
		.notEmpty()
		.withMessage("Phone number is required")
		.isLength({ min: 10, max: 10 })
		.withMessage("Phone number should be 10 digits"),

	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 6 })
		.withMessage("Password should be at least 6 characters")
];

export const OtpValidation = [
	body("phone")
		.notEmpty()
		.withMessage("Phone number is required")
		.isLength({ min: 10, max: 10 })
		.withMessage("Phone number should be 10 digits"),

	body("otp").notEmpty().withMessage("otp number is required")
];
