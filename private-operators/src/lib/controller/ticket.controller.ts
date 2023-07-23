import { currentUser, requireAuth } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { container } from "tsyringe";
import { TicketService } from "../service/ticket.service";

const router = express();

const Service = container.resolve(TicketService);

router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;

	const result = await Service.findbyId(id);

	return res.status(200).json({ result });
});

router.get("/all", currentUser, requireAuth, async (req: Request, res: Response) => {
	const operatorId = req.currentUser?.id!;

	const result = await Service.findAll(operatorId);

	return res.status(200).json({ result });
});
