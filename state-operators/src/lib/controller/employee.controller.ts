import { currentUser, requireAuth, validateRequest } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { EmployeeService } from "../service/employee.service";
import { EmployeeRepository } from "../database/mongo/repository/employee.repository";
import { DepotRepository } from "../database/mongo/repository/depot.repository";
import { createEmployeeValidation } from "./validator/validator";

const router = express();

const Service = new EmployeeService(new EmployeeRepository(), new DepotRepository());

export interface IEmployee {
	name: string;

	type: string;

	depotCode: string;

	phone: number;

	Operator: string;
}

router.post("/", createEmployeeValidation, validateRequest, currentUser, requireAuth, async (req: Request, res: Response) => {
	const { depotCode, name, phone, type, Operator } = req.body as IEmployee;

	const user = await Service.createEmployee({ depotCode, name, phone, type, Operator });

	res.status(201).json({ user });
});

router.get("/all", currentUser, requireAuth, async (req: Request, res: Response) => {
	const depot = req.query.depot;

	const users = await Service.getAllEmployees(depot as string);

	res.status(201).json({ users });
});

router.patch("/edit/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id;

	const data = req.body as IEmployee;

	const user = await Service.EditEmployee(data, id);

	res.status(200).json({ user });
});

router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id;

	const user = await Service.getEmploye(id);

	res.status(201).json({ user });
});

router.delete("/delete/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id;

	await Service.DeleteEmployee(id);

	res.status(201).json({ message: "Employee Deleted Succesfully" });
});

export { router as EmployeeRouter };