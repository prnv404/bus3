import { autoInjectable } from "tsyringe";
import { BadRequestError } from "@prnv404/bus3";
import { TicketAttrs } from "../../app/database/mongo/models/ticket.model";
import { PvtOperatorRepository } from "../../app/repository/mongo/pvt.operator.repository";
import { TicketRepository } from "../../app/repository/mongo/ticket.repository";
import { Ticket } from "../../entites";

@autoInjectable()
export class TicketUseCase {
	constructor(
		private readonly ticketRepsoitory: TicketRepository,
		private readonly operatorRepository: PvtOperatorRepository
	) {}

	async Create(data: TicketAttrs) {
		try {
			const operator = await this.operatorRepository.findbyId(data.operatorId);
			if (!operator) throw new Error("No OpeatorFound");
			const ticket = await this.ticketRepsoitory.Create(
				new Ticket(data.busNo, data.price, data.operatorId, data.route, data.from, data.to)
			);
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
