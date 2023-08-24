import { currentUser, requireAuth } from "@prnv404/bus3";
import express from "express";
import { IDependencie } from "../config/dependency.config";

export = (dependencies: IDependencie) => {
	const { ticketController } = dependencies;

	const router = express();

	router.get("/all", currentUser, requireAuth, ticketController.getAllTickets);

	router.get("/date", currentUser, requireAuth, ticketController.getTicketsByDate);

	router.get("/revenue/day", currentUser, requireAuth, ticketController.getRevenueOfDay);

	router.get("/revenue/week", currentUser, requireAuth, ticketController.getRevenueOfWeek);

	router.get("/revenue/month", currentUser, requireAuth, ticketController.getRevenueOfMonth);

	router.get("/:id", currentUser, requireAuth, ticketController.getTicketById);

	return router;
};
