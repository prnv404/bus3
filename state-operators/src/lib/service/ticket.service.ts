import { autoInjectable } from "tsyringe";
import { TicketRepository } from "../database/mongo/repository/ticket.repository";
import { TicketAttrs } from "../database/mongo/models/ticket.model";
import { DepotRepository } from "../database/mongo/repository/depot.repository";

@autoInjectable()
export class TicketService {
	constructor(
		private readonly ticketRepository: TicketRepository,
		private readonly depotRepository: DepotRepository
	) {}

	async create(data: TicketAttrs) {
		try {
			const operator = await this.depotRepository.findById(data.OperatorId);
			if (!operator) console.log("----->>>>>>>>>>>>>>>>>>NOT OPERATOR FOUND <<<<<<<<<<<<<<<<<<<<<<------------------");
			const ticket = await this.ticketRepository.Create(data);
			return ticket;
		} catch (error) {
			console.log(error);
		}
	}
}
``;
