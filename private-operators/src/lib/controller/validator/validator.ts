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

export const busValidation = [
	body("BusNo").notEmpty().withMessage("BusNo is required").isString().withMessage("BusNo must be a string"),
	body("type").notEmpty().withMessage("Type is required").isString().withMessage("Type must be a string"),
	body("seats").notEmpty().withMessage("Seats is required").isInt().withMessage("Seats must be an integer")
];

export const EditBusValidation = [
	body("BusNo").isString().withMessage("BusNo must be a string"),
	body("type").isString().withMessage("Type must be a string"),
	body("seats").isInt().withMessage("Seats must be an integer")
];
