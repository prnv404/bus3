import { currentUser, requireAuth } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { container } from "tsyringe";
import { TicketService } from "../service/ticket.service";

const router = express();

const Service = container.resolve(TicketService);

router.get("/all", currentUser, requireAuth, async (req: Request, res: Response) => {
	const depotCode = req.query.depotCode as string;
	const result = await Service.findAll(depotCode);
	return res.status(200).json({ count: result.length, result });
});

router.get("/date", currentUser, requireAuth, async (req: Request, res: Response) => {
	const depotCode = req.query.depotCode as string;

	const date = req.query.date as string;

	const result = await Service.findByDate(depotCode, date);

	return res.status(200).json({ count: result.length, result });
});

router.get("/revenue/day", currentUser, requireAuth, async (req: Request, res: Response) => {
	const depotCode = req.query.depotCode as string;

	const startDate = req.query.startDate as string;

	const result = await Service.GetTicketRevenueofDay(depotCode, startDate);

	return res.status(200).json({ result });
});

router.get("/revenue/week", currentUser, requireAuth, async (req: Request, res: Response) => {
	const depotCode = req.query.depotCode as string;

	const startDate = req.query.startDate as string;

	const result = await Service.GetTicketRevenueofWeek(depotCode, startDate);

	return res.status(200).json({ result });
});

router.get("/revenue/month", currentUser, requireAuth, async (req: Request, res: Response) => {
	const depotCode = req.query.depotCode as string;

	const startDate = req.query.startDate as string;

	const result = await Service.GetTicketRevenueofMonth(depotCode, startDate);

	return res.status(200).json({ result });
});

router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;

	const result = await Service.findbyId(id);

	return res.status(200).json({ result });
});

export { router as TicketRouter };
