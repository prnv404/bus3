import { currentUser, requireAuth } from "@prnv404/bus3";
import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { SearchUseCase } from "../usecase/search/search.service";

@autoInjectable()
export class SearchController {
	constructor(private readonly Service: SearchUseCase) {}

	searchTrips = async (req: Request, res: Response) => {
		const startstop = req.query.startstop as string;
		const endstop = req.query.endstop as string;
		const trips = await this.Service.search(startstop, endstop);
		res.status(200).json({ trips });
	};

	getStopTimes = async (req: Request, res: Response) => {
		const tripId = req.query.tripId as string;
		const stopTimes = await this.Service.getTimeOfTrip(tripId);
		res.json(stopTimes);
	};

	getTripsByRoute = async (req: Request, res: Response) => {
		const routename = req.query.route as string;
		const trips = await this.Service.GetTripByRouteName(routename);
		res.json({ trips });
	};
}

// import { currentUser, requireAuth } from "@prnv404/bus3";
// import express, { NextFunction, Request, Response } from "express";
// import { container } from "tsyringe";
// import { , SearchUseCase } from "../usecase/search/search.service";
// const router = express.Router();

// export class SearchController {
// 	constructor(private readonly Service: SearchUseCase) {}
// }

// router.get("/", currentUser, requireAuth, async (req: Request, res: Response) => {
// 	const startstop = req.query.startstop as string;
// 	const endstop = req.query.endstop as string;
// 	const trips = await Service.search(startstop, endstop);
// 	res.status(200).json({ trips });
// });

// router.get("/stoptime", currentUser, requireAuth, async (req: Request, res: Response) => {
// 	const tripId = req.query.tripId as string;
// 	const stopTimes = await Service.getTimeOfTrip(tripId);
// 	res.json(stopTimes);
// });

// router.get("/route", currentUser, requireAuth, async (req: Request, res: Response) => {
// 	const routename = req.query.route as string;
// 	console.log("hello");
// 	const trips = await Service.GetTripByRouteName(routename);

// 	res.json({ trips });
// });

// export { router as SearchRouter };
