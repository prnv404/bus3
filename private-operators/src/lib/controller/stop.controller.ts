import { currentUser, requireAuth } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { IStop } from "../database/mongo/models/stop.model";
import { container } from "tsyringe";
import { StopService } from "../service/stop.service";

const router = express.Router();

const Service = container.resolve(StopService);

router.post("/create", currentUser, requireAuth, async (req: Request, res: Response) => {
	const data = req.body as IStop;
	const result = await Service.createStop(data);
	return res.json(201).json({ result });
});

router.get("/all", currentUser, requireAuth, async (req: Request, res: Response) => {
	const result = await Service.getAllStops();
	return res.json(200).json({ result });
});

router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.getStopById(id);
	return res.json(200).json({ result });
});

router.patch("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const data = req.body as IStop;
	const id = req.params.id as string;
	const result = await Service.updateStop(id, data);
	return res.json(200).json({ result });
});

router.delete("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.deleteStop(id);
	return res.json(200).json({ result });
});
