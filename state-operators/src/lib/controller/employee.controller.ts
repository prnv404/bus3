import { currentUser, requireAuth, sanitizeData, validateRequest } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { EmployeeUseCase } from "../usecase/employee/employee.usecase";
import { createEmployeeValidation } from "../../routes/validator/validator";
import { autoInjectable, container } from "tsyringe";

// const Service = new EmployeeService(new EmployeeRepository(), new DepotRepository());

export interface IEmployee {
	name: string;

	type: string;

	depotCode: string;

	phone: number;

	Operator: string;
}

@autoInjectable()
export class EmployeeController {
	constructor(private readonly Service: EmployeeUseCase) {}
	createEmployee = async (req: Request, res: Response) => {
		const { depotCode, name, phone, type, Operator } = req.body as IEmployee;

		const user = await this.Service.createEmployee({ depotCode, name, phone, type, Operator });

		res.status(201).json({ user });
	};

	GetAllEmployee = async (req: Request, res: Response) => {
		const depot = req.query.depot;

		const users = await this.Service.getAllEmployees(depot as string);

		res.status(201).json({ users });
	};

	EditEmployee = async (req: Request, res: Response) => {
		const id = req.params.id;

		const data = req.body as IEmployee;

		const user = await this.Service.EditEmployee(data, id);

		res.status(200).json({ user });
	};

	GetEmployee = async (req: Request, res: Response) => {
		const id = req.params.id;

		const user = await this.Service.getEmploye(id);

		res.status(201).json({ user });
	};

	DeleteEmployee = async (req: Request, res: Response) => {
		const id = req.params.id;

		await this.Service.DeleteEmployee(id);

		res.status(201).json({ message: "Employee Deleted Succesfully" });
	};
}
