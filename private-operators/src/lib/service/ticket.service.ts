import { autoInjectable } from "tsyringe";
import { TicketAttrs } from "../database/mongo/models/ticket.model";
import { TicketRepository } from "../database/mongo/repository/ticket.repository";

@autoInjectable()
export class TicketService {
	constructor(private readonly ticketRepsoitory: TicketRepository) {}

	async Create(data: TicketAttrs) {
		const ticket = this.ticketRepsoitory.Create(data);
		return ticket;
	}

	async findbyId() {}

	async findAll() {}

	async findByDate() {}
}
