import { currentUser, requireAuth } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { ITrip } from "../database/mongo/models/trip.model";
import { container } from "tsyringe";
import { TripService } from "../service/trip.service";
import { PUT_TO_ELASTIC } from "../database/elasticsearch/elasticsearch.repository";

const router = express.Router();

const Service = container.resolve(TripService);

router.post("/", currentUser, requireAuth, async (req: Request, res: Response) => {
	const data = req.body as ITrip;
	const result = await Service.createTrip(data);
	await PUT_TO_ELASTIC("trip", result);
	res.status(201).json({ result });
});

router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.getTripById(id);
	res.status(200).json({ result });
});

router.put("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const data = req.body as ITrip;
	const result = await Service.updateTrip(id, data);
	res.status(200).json({ result });
});

router.delete("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.getTripById(id);
	res.status(200).json({ result });
});

export { router as TripRouter };
