import { currentUser, requireAuth } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { ITrip } from "../database/mongo/models/trip.model";
import { container } from "tsyringe";
import { TripService } from "../service/trip.service";

const router = express.Router();

const Service = container.resolve(TripService);

router.post("/trip", currentUser, requireAuth, async (req: Request, res: Response) => {
	const data = req.body as ITrip;
	const result = await Service.createTrip(data);
	res.status(201).json({ result });
});

router.get("/trip/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.getTripById(id);
	res.status(200).json({ result });
});

router.put("/trip/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const data = req.body as ITrip;
	const result = await Service.updateTrip(id, data);
	res.status(200).json({ result });
});

router.delete("/trip/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.getTripById(id);

	res.status(200).json({ result });
});
