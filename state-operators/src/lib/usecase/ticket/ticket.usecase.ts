import { autoInjectable } from "tsyringe";
import { TicketAttrs } from "../../app/database/mongo/models/ticket.model";
import { DepotRepository } from "../../app/repository/mongo/depot.repository";
import { TicketRepository } from "../../app/repository/mongo/ticket.repository";

@autoInjectable()
export class TicketUseCase {
	constructor(
		private readonly ticketRepsoitory: TicketRepository,
		private readonly depotRepository: DepotRepository
	) {}

	async create(data: TicketAttrs) {
		try {
			const operator = await this.depotRepository.findById(data.OperatorId);
			if (!operator) console.log("----->>>>>>>>>>>>>>>>>>NOT OPERATOR FOUND <<<<<<<<<<<<<<<<<<<<<<------------------");
			data.depotCode = operator?.depotCode!;
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

	async findAll(depotcode: string) {
		console.log(depotcode);
		const tickets = await this.ticketRepsoitory.findByAllTicket(depotcode);
		return tickets;
	}

	async findByDate(operatorid: string, date: string) {
		const searchDate = new Date(date);
		const tickets = await this.ticketRepsoitory.findTicketByDate(operatorid, searchDate);
		// if (tickets.length == 0) throw new NotFoundError();
		return tickets;
	}

	async GetTicketRevenueofDay(depotcode: string, startDate: string) {
		const revenue = await this.ticketRepsoitory.getRevenueofDay(depotcode, startDate);
		return revenue;
	}
	async GetTicketRevenueofWeek(depotcode: string, startDate: string) {
		const revenue = await this.ticketRepsoitory.getRevenueofWeek(depotcode, startDate);
		return revenue;
	}
	async GetTicketRevenueofMonth(depotcode: string, startDate: string) {
		const revenue = await this.ticketRepsoitory.getRevenueofMonth(depotcode, startDate);
		return revenue;
	}
}
