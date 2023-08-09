import { currentUser, requireAuth } from "@prnv404/bus3";
import express, { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { SearchService } from "../service/search.service";
const router = express.Router();

const Service = container.resolve(SearchService);

router.get("/", currentUser, requireAuth, async (req: Request, res: Response) => {
	const startstop = req.query.startstop as string;
	const endstop = req.query.endstop as string;
	const trips = await Service.search(startstop, endstop);
	res.status(200).json({ trips });
});

router.get("/stoptime", currentUser, requireAuth, async (req: Request, res: Response) => {
	const tripId = req.query.tripId as string;
	const stopTimes = await Service.getTimeOfTrip(tripId);
	res.json(stopTimes);
});

export { router as SearchRouter };
