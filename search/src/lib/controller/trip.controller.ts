import { currentUser, requireAuth } from "@prnv404/bus3";
import { Request, Response } from "express";
import { autoInjectable, container } from "tsyringe";
import { TripUseCase } from "../usecase/trip/trip.service";
import { ITrip } from "../app/database/mongo/model/trip.model";

@autoInjectable()
export class TripController {
	constructor(private readonly Service: TripUseCase) {}

	createTrip = async (req: Request, res: Response) => {
		const data = req.body as ITrip;
		const result = await this.Service.createTrip(data);
		res.status(201).json({ result });
	};

	getAllTrips = async (req: Request, res: Response) => {
		const result = await this.Service.getTrips();
		res.status(200).json({ result });
	};

	getTripById = async (req: Request, res: Response) => {
		const id = req.params.id as string;
		const result = await this.Service.getTripById(id);
		res.status(200).json({ result });
	};

	updateTrip = async (req: Request, res: Response) => {
		const id = req.params.id as string;
		const data = req.body as ITrip;
		const result = await this.Service.updateTrip(id, data);
		res.status(200).json({ result });
	};

	deleteTrip = async (req: Request, res: Response) => {
		const id = req.params.id as string;
		const result = await this.Service.deleteTrip(id);
		res.status(200).json({ result });
	};
}

// import { currentUser, requireAuth } from "@prnv404/bus3";
// import express, { Request, Response } from "express";
// import { container } from "tsyringe";
// import { TripService, TripUseCase } from "../usecase/trip/trip.service";
// import { ITrip } from "../app/database/mongo/model/trip.model";

// const router = express.Router();

// const Service = container.resolve(TripService);

// export class TripController {
// 	constructor(private readonly Service: TripUseCase) {}
// }

// router.post("/", currentUser, requireAuth, async (req: Request, res: Response) => {
// 	const data = req.body as ITrip;
// 	const result = await Service.createTrip(data);
// 	res.status(201).json({ result });
// });

// router.get("/all", currentUser, requireAuth, async (req: Request, res: Response) => {
// 	const result = await Service.getTrips();
// 	res.status(200).json({ result });
// });

// router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
// 	const id = req.params.id as string;
// 	const result = await Service.getTripById(id);
// 	res.status(200).json({ result });
// });

// router.patch("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
// 	const id = req.params.id as string;
// 	const data = req.body as ITrip;
// 	const result = await Service.updateTrip(id, data);
// 	res.status(200).json({ result });
// });

// router.delete("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
// 	const id = req.params.id as string;
// 	const result = await Service.deleteTrip(id);
// 	res.status(200).json({ result });
// });

// export { router as TripRouter };
