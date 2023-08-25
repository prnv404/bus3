import express, { Request, Response } from "express";
import { currentUser, requireAuth } from "@prnv404/bus3";
import { autoInjectable, container } from "tsyringe";
import { StopsTimeInterFace } from "../app/database/mongo/model/stops.time.model";
import { StopTimeUsecase } from "../usecase/stop-time/stop.time.service";

@autoInjectable()
export class StopTimeController {
	constructor(private readonly Service: StopTimeUsecase) {}

	createStopTime = async (req: Request, res: Response) => {
		const data = req.body as StopsTimeInterFace;
		const result = await this.Service.createStoptime(data);
		res.status(201).json({ result });
	};

	findStopTimeOfTrip = async (req: Request, res: Response) => {
		const tripId = req.query.tripId as string;
		const result = await this.Service.findStopTimeOfTrip(tripId);
		res.status(200).json({ result });
	};

	findById = async (req: Request, res: Response) => {
		const id = req.params.id as string;
		const result = await this.Service.findByid(id);
		res.status(200).json({ result });
	};

	updateStopTime = async (req: Request, res: Response) => {
		const id = req.params.id as string;
		const data = req.body as StopsTimeInterFace;
		const result = await this.Service.updateStopTime(id, data);
		res.status(200).json({ result });
	};

	deleteStopTime = async (req: Request, res: Response) => {
		const id = req.params.id as string;
		const result = await this.Service.delete(id);
		res.status(200).json({ result });
	};
}

// import express, { Request, Response } from "express";
// import { currentUser, requireAuth } from "@prnv404/bus3";
// import { container } from "tsyringe";
// import { StopsTimeInterFace } from "../app/database/mongo/model/stops.time.model";
// import { StopTimeService, StopTimeUsecase } from "../usecase/stop-time/stop.time.service";

// const Service = container.resolve(StopTimeService);

// export class StopTimeController {
// 	constructor(private readonly Service: StopTimeUsecase) {}
// }

// router.post("/", currentUser, requireAuth, async (req: Request, res: Response) => {
// 	const data = req.body as StopsTimeInterFace;
// 	const result = await Service.createStoptime(data);
// 	res.status(201).json({ result });
// });

// router.get("/", currentUser, requireAuth, async (req: Request, res: Response) => {
// 	const tripId = req.query.tripId as string;
// 	const result = await Service.findStopTimeOfTrip(tripId);
// 	res.status(200).json({ result });
// });

// router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
// 	const id = req.params.id as string;
// 	const result = await Service.findByid(id);
// 	res.status(200).json({ result });
// });

// router.put("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
// 	const id = req.params.id as string;
// 	const data = req.body as StopsTimeInterFace;
// 	const result = await Service.updateStopTime(id, data);
// 	res.status(200).json({ result });
// });

// router.delete("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
// 	const id = req.params.id as string;
// 	const result = await Service.delete(id);
// 	res.status(200).json({ result });
// });

// export { router as StopTimeRouter };
