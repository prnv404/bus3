import { currentUser, requireAuth } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { autoInjectable, container } from "tsyringe";
import { TicketUseCase } from "../usecase/ticket/ticket.usecase";

@autoInjectable()
export class TicketController {
	constructor(private readonly Service: TicketUseCase) {}
	FindAll = async (req: Request, res: Response) => {
		const depotCode = req.query.depotCode as string;
		const result = await this.Service.findAll(depotCode);
		return res.status(200).json({ count: result.length, result });
	};

	FindByDate = async (req: Request, res: Response) => {
		const depotCode = req.query.depotCode as string;

		const date = req.query.date as string;

		const result = await this.Service.findByDate(depotCode, date);

		return res.status(200).json({ count: result.length, result });
	};

	FindRevenueOfDay = async (req: Request, res: Response) => {
		const depotCode = req.query.depotCode as string;

		const startDate = req.query.startDate as string;

		const result = await this.Service.GetTicketRevenueofDay(depotCode, startDate);

		return res.status(200).json({ result });
	};

	FindRevenueOfWeek = async (req: Request, res: Response) => {
		const depotCode = req.query.depotCode as string;

		const startDate = req.query.startDate as string;

		const result = await this.Service.GetTicketRevenueofWeek(depotCode, startDate);

		return res.status(200).json({ result });
	};

	FindRevenueofMonth = async (req: Request, res: Response) => {
		const depotCode = req.query.depotCode as string;

		const startDate = req.query.startDate as string;

		const result = await this.Service.GetTicketRevenueofMonth(depotCode, startDate);

		return res.status(200).json({ result });
	};

	FindBydId = async (req: Request, res: Response) => {
		const id = req.params.id as string;

		const result = await this.Service.findbyId(id);

		return res.status(200).json({ result });
	};
}
