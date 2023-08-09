import express, { Request, Response } from "express";
import { currentUser, requireAuth } from "@prnv404/bus3";
import { container } from "tsyringe";
import { StopsTimeInterFace } from "../database/mongo/model/stops.time.model";
import { StopTimeService } from "../service/stop.time.service";

const router = express.Router();

const TimeService = container.resolve(StopTimeService);

router.post("/", currentUser, requireAuth, async (req: Request, res: Response) => {
	const data = req.body as StopsTimeInterFace;
	const result = await TimeService.createStoptime(data);
	res.status(201).json({ result });
});

router.get("/", currentUser, requireAuth, async (req: Request, res: Response) => {
	const tripId = req.query.tripId as string;
	const result = await TimeService.findStopTimeOfTrip(tripId);
	res.status(200).json({ result });
});

router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await TimeService.findByid(id);
	res.status(200).json({ result });
});

router.put("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const data = req.body as StopsTimeInterFace;
	const result = await TimeService.updateStopTime(id, data);
	res.status(200).json({ result });
});

router.delete("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await TimeService.delete(id);
	res.status(200).json({ result });
});

export { router as StopTimeRouter };
