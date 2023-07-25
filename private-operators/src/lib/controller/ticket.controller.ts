import { currentUser, requireAuth } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { container } from "tsyringe";
import { TicketService } from "../service/ticket.service";

const router = express();

const Service = container.resolve(TicketService);

router.get("/all", currentUser, requireAuth, async (req: Request, res: Response) => {
	const operatorId = req.currentUser?.id!;
	console.log(operatorId);
	const result = await Service.findAll(operatorId);

	return res.status(200).json({ count: result.length, result });
});

router.get("/date", currentUser, requireAuth, async (req: Request, res: Response) => {
	const operatorId = req.currentUser?.id!;

	const date = req.query.date as string;

	const result = await Service.findByDate(operatorId, date);

	return res.status(200).json({ count: result.length, result });
});

router.get("/revenue", currentUser, requireAuth, async (req: Request, res: Response) => {
	const operatorId = req.currentUser?.id!;

	const startDate = req.query.startDate as string;
	const endDate = req.query.endDate as string;

	const result = await Service.GetTicketRevenue(operatorId, startDate, endDate);

	return res.status(200).json({ result });
});

router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;

	const result = await Service.findbyId(id);

	return res.status(200).json({ result });
});

export { router as TicketRouter };
