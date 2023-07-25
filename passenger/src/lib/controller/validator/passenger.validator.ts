import { body } from "express-validator";

export const editValidatoin = [
	body("name")
		.isString()
		.optional()
		.notEmpty()
		.trim()
		.isLength({ min: 2, max: 50 })
		.withMessage("Name must be between 2 and 50 characters"),
	body("age").optional().notEmpty().withMessage("Age must be a valid number between 0 and 120"),
	body("type").optional().notEmpty().isIn(["student", "regular"]).withMessage("Invalid user type"),
	body("district")
		.optional()
		.notEmpty()
		.trim()
		.isLength({ min: 2, max: 50 })
		.withMessage("District must be between 2 and 50 characters"),
	body("institution")
		.optional()
		.notEmpty()
		.trim()
		.isLength({ min: 2, max: 100 })
		.withMessage("Institution must be between 2 and 100 characters")
];

export const busValidation = [body("busNo").notEmpty().isString(), body("addDelete").notEmpty().isBoolean()];

export const routeValidation = [body("routeId").notEmpty().isString(), body("addDelete").notEmpty().isBoolean()];
export const scheduleValidation = [body("scheduleId").notEmpty().isString(), body("addDelete").notEmpty().isBoolean()];
