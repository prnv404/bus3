import { currentUser, requireAuth } from "@prnv404/bus3";
import { Request, Response } from "express";
import { autoInjectable, container } from "tsyringe";
import { StopUseCase } from "../usecase/stop/stop.service";
import { IStop } from "../app/database/mongo/model/stop.model";

@autoInjectable()
export class StopController {
	constructor(private readonly Service: StopUseCase) {}

	createStop = async (req: Request, res: Response) => {
		const data = req.body as IStop;
		const result = await this.Service.createStop(data);
		return res.status(201).json({ result });
	};

	getAllStops = async (req: Request, res: Response) => {
		const result = await this.Service.getAllStops();
		res.status(200).json({ result });
	};

	getStopById = async (req: Request, res: Response) => {
		const id = req.params.id as string;
		const result = await this.Service.getStopById(id);
		return res.status(200).json({ result });
	};

	updateStop = async (req: Request, res: Response) => {
		const data = req.body as IStop;
		const id = req.params.id as string;
		const result = await this.Service.updateStop(id, data);
		return res.status(200).json({ result });
	};

	deleteStop = async (req: Request, res: Response) => {
		const id = req.params.id as string;
		const result = await this.Service.deleteStop(id);
		return res.status(200).json({ result });
	};
}

// import { currentUser, requireAuth } from "@prnv404/bus3";
// import express, { Request, Response } from "express";
// import { container } from "tsyringe";
// import { StopService, StopUseCase } from "../usecase/stop/stop.service";
// import { IStop } from "../app/database/mongo/model/stop.model";

// const router = express.Router();

// const Service = container.resolve(StopService);

// export class StopController {
// 	constructor(private readonly Service: StopUseCase) {}
// }

// router.post("/create", async (req: Request, res: Response) => {
// 	const data = req.body as IStop;
// 	const result = await Service.createStop(data);

// 	return res.status(201).json({ result });
// });

// router.get("/all", async (req: Request, res: Response) => {
// 	const result = await Service.getAllStops();
// 	res.status(200).json({ result });
// });

// router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
// 	const id = req.params.id as string;
// 	const result = await Service.getStopById(id);
// 	return res.status(200).json({ result });
// });

// router.patch("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
// 	const data = req.body as IStop;
// 	const id = req.params.id as string;
// 	const result = await Service.updateStop(id, data);
// 	return res.status(200).json({ result });
// });

// router.delete("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
// 	const id = req.params.id as string;
// 	const result = await Service.deleteStop(id);
// 	return res.status(200).json({ result });
// });

// export { router as StopRouter };
