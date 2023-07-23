import { autoInjectable } from "tsyringe";
import { TicketAttrs } from "../database/mongo/models/ticket.model";
import { TicketRepository } from "../database/mongo/repository/ticket.repository";
import { PvtOperatorRepository } from "../database/mongo/repository/pvt.operator.repository";

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
		const tickets = await this.ticketRepsoitory.findByAllTicket(operatorId);
		return tickets;
	}

	async findByDate(date: string) {
		// const ticket = await this.ticketRepsoitory.findTicketByDate(date);
	}
}
