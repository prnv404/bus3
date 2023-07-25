import mongoose from "mongoose";
import { Ticket, TicketAttrs } from "../models/ticket.model";

export class TicketRepository {
	constructor() {}

	async Create(data: TicketAttrs) {
		const ticket = await Ticket.build(data).save();

		return ticket;
	}

	async findById(id: string) {
		const ticket = await Ticket.findById(id);

		return ticket;
	}

	async findByAllTicket(OperatorId: string) {
		const tickets = await Ticket.find({ OperatorId: OperatorId });

		return tickets;
	}

	async findTicketByDate(OperatorId: string, date: Date) {
		const nextDay = new Date(date);
		nextDay.setDate(nextDay.getDate() + 1);
		const tickets = await Ticket.find({
			OperatorId,
			createdAt: {
				$gte: date,
				$lt: nextDay
			}
		});

		return tickets;
	}

	async getRevenue(operatorId: string, startDate: string, endDate: string) {
		const operatorObjectId = new mongoose.Types.ObjectId(operatorId);
		const startdate = new Date(startDate);
		const ticketRevenue = await Ticket.aggregate([
			{
				$match: {
					OperatorId: operatorObjectId,
					createdAt: {
						$lte: startdate
					}
				}
			},
			{
				$group: {
					_id: null,
					totalCollection: { $sum: "$price" }
				}
			}
		]);
		return ticketRevenue;
	}
}
