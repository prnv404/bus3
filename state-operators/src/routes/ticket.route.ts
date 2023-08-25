import { currentUser, requireAuth } from "@prnv404/bus3";
import express from "express";
import { IDependencies } from "../config/dependency.config";

export = (dependencies: IDependencies) => {
	const router = express.Router();
	const { ticketController } = dependencies;
	router.get("/all", currentUser, requireAuth, ticketController.FindAll);
	router.get("/date", currentUser, requireAuth, ticketController.FindByDate);
	router.get("/revenue/day", currentUser, requireAuth, ticketController.FindRevenueOfDay);
	router.get("/revenue/week", currentUser, requireAuth, ticketController.FindRevenueOfWeek);
	router.get("/revenue/month", currentUser, requireAuth, ticketController.FindRevenueofMonth);
	router.get("/:id", currentUser, requireAuth, ticketController.FindBydId);
	return router;
};
