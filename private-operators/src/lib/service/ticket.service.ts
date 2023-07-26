import { autoInjectable } from "tsyringe";
import { TicketAttrs } from "../database/mongo/models/ticket.model";
import { TicketRepository } from "../database/mongo/repository/ticket.repository";
import { PvtOperatorRepository } from "../database/mongo/repository/pvt.operator.repository";
import { BadRequestError } from "@prnv404/bus3";

@autoInjectable()
export class TicketService {
	constructor(
		private readonly ticketRepsoitory: TicketRepository,
		private readonly operatorRepository: PvtOperatorRepository
	) {}

	async Create(data: TicketAttrs) {
		try {
			const operator = await this.operatorRepository.findbyId(data.OperatorId);
			if (!operator) throw new Error("No OpeatorFound");
			const ticket = await this.ticketRepsoitory.Create(data);
			return ticket;
		} catch (error) {
			console.log(error);
		}
	}

	async findbyId(id: string) {
		const ticket = await this.ticketRepsoitory.findById(id);
		return ticket;
	}

	async findAll(operatorId: string) {
		console.log(operatorId);
		const tickets = await this.ticketRepsoitory.findByAllTicket(operatorId);
		return tickets;
	}

	async findByDate(operatorid: string, date: string) {
		const searchDate = new Date(date);
		const tickets = await this.ticketRepsoitory.findTicketByDate(operatorid, searchDate);
		if (tickets.length == 0) throw new BadRequestError("No ticket Found");
		return tickets;
	}

	async GetTicketRevenueofDay(operatorId: string, startDate: string) {
		const revenue = await this.ticketRepsoitory.getRevenueofDay(operatorId, startDate);
		return revenue;
	}
	async GetTicketRevenueofWeek(operatorId: string, startDate: string) {
		const revenue = await this.ticketRepsoitory.getRevenueofWeek(operatorId, startDate);
		return revenue;
	}
	async GetTicketRevenueofMonth(operatorId: string, startDate: string) {
		const revenue = await this.ticketRepsoitory.getRevenueofMonth(operatorId, startDate);
		return revenue;
	}
}
