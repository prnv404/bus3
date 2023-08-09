import { currentUser, requireAuth } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { container } from "tsyringe";
import { TripService } from "../service/trip.service";
import { ITrip } from "../database/mongo/model/trip.model";

const router = express.Router();

const Service = container.resolve(TripService);

router.post("/", currentUser, requireAuth, async (req: Request, res: Response) => {
	const data = req.body as ITrip;
	const result = await Service.createTrip(data);
	res.status(201).json({ result });
});

router.get("/all", currentUser, requireAuth, async (req: Request, res: Response) => {
	const result = await Service.getTrips();
	res.status(200).json({ result });
});

router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.getTripById(id);
	res.status(200).json({ result });
});

router.patch("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const data = req.body as ITrip;
	const result = await Service.updateTrip(id, data);
	res.status(200).json({ result });
});

router.delete("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.deleteTrip(id);
	res.status(200).json({ result });
});

export { router as TripRouter };
