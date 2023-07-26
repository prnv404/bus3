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

	async findByAllTicket(depotCode: string) {
		const tickets = await Ticket.find({ depotCode: depotCode });

		return tickets;
	}

	async findTicketByDate(depotCode: string, date: Date) {
		const nextDay = new Date(date);
		nextDay.setDate(nextDay.getDate() + 1);
		const tickets = await Ticket.find({
			depotCode,
			createdAt: {
				$gte: date,
				$lt: nextDay
			}
		});

		return tickets;
	}

	async getRevenueofDay(depotCode: string, startDate: string) {
		const startdate = new Date(startDate);
		const ticketRevenue = await Ticket.aggregate([
			{
				$match: {
					depotCode: depotCode,
					createdAt: {
						$gte: startdate,
						$lt: new Date(startdate.getTime() + 24 * 60 * 60 * 1000)
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

	async getRevenueofWeek(depotCode: string, startDate: string) {
		const startdate = new Date(startDate);
		const ticketRevenue = await Ticket.aggregate([
			{
				$match: {
					depotCode: depotCode,
					createdAt: {
						$gte: startdate,
						$lt: new Date(startdate.getTime() + 7 * 24 * 60 * 60 * 1000)
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

	async getRevenueofMonth(depotCode: string, startDate: string) {
		const startdate = new Date(startDate);
		const ticketRevenue = await Ticket.aggregate([
			{
				$match: {
					depotCode: depotCode,
					createdAt: {
						$gte: startdate,
						$lt: new Date(startdate.getFullYear(), startdate.getMonth() + 1, 0)
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
