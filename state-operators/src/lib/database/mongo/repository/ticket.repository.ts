import { Ticket, TicketAttrs } from "../models/ticket.model";

export class TicketRepository {
	constructor() {}

	async Create(data: TicketAttrs) {
		const ticket = await Ticket.build(data).save();
		return ticket;
	}

	async findbyId(id: string) {
		const ticket = await Ticket.findById(id);
		return ticket;
	}

	async findByOperatorId(id: string) {
		const ticket = await Ticket.findOne({ OperatorId: id });
		return ticket;
	}

	async findByDate(date: Date) {
		const tickets = await Ticket.find({
			createdAt: {
				$lt: date
			}
		});
		return tickets;
	}
}
