import { currentUser, requireAuth } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { container } from "tsyringe";
import { StopService } from "../service/stop.service";
import { IStop } from "../database/mongo/model/stop.model";

const router = express.Router();

const Service = container.resolve(StopService);

router.post("/create", async (req: Request, res: Response) => {
	const data = req.body as IStop;
	const result = await Service.createStop(data);

	return res.status(201).json({ result });
});

router.get("/all", async (req: Request, res: Response) => {
	const result = await Service.getAllStops();
	res.status(200).json({ result });
});

router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.getStopById(id);
	return res.status(200).json({ result });
});

router.patch("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const data = req.body as IStop;
	const id = req.params.id as string;
	const result = await Service.updateStop(id, data);
	return res.status(200).json({ result });
});

router.delete("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.deleteStop(id);
	return res.status(200).json({ result });
});

export { router as StopRouter };
