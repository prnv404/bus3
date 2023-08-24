import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { currentUser, requireAuth } from "@prnv404/bus3";
import express from "express";
import { TicketUseCase } from "../usecase/ticket/ticket-usecase";

@autoInjectable()
export class TicketController {
	constructor(private readonly Service: TicketUseCase) {}

	getAllTickets = async (req: Request, res: Response) => {
		const operatorId = req.currentUser?.id!;
		const result = await this.Service.findAll(operatorId);
		return res.status(200).json({ count: result.length, result });
	};

	getTicketsByDate = async (req: Request, res: Response) => {
		const operatorId = req.currentUser?.id!;
		const date = req.query.date as string;
		const result = await this.Service.findByDate(operatorId, date);
		return res.status(200).json({ count: result.length, result });
	};

	getRevenueOfDay = async (req: Request, res: Response) => {
		const operatorId = req.currentUser?.id!;
		const startDate = req.query.startDate as string;
		const result = await this.Service.GetTicketRevenueofDay(operatorId, startDate);
		return res.status(200).json({ result });
	};

	getRevenueOfWeek = async (req: Request, res: Response) => {
		const operatorId = req.currentUser?.id!;
		const startDate = req.query.startDate as string;
		const result = await this.Service.GetTicketRevenueofWeek(operatorId, startDate);
		return res.status(200).json({ result });
	};

	getRevenueOfMonth = async (req: Request, res: Response) => {
		const operatorId = req.currentUser?.id!;
		const startDate = req.query.startDate as string;
		const result = await this.Service.GetTicketRevenueofMonth(operatorId, startDate);
		return res.status(200).json({ result });
	};

	getTicketById = async (req: Request, res: Response) => {
		const id = req.params.id as string;
		const result = await this.Service.findbyId(id);
		return res.status(200).json({ result });
	};
}
