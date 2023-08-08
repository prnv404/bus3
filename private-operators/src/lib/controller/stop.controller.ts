import { currentUser, requireAuth } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { IStop } from "../database/mongo/models/stop.model";
import { container } from "tsyringe";
import { StopService } from "../service/stop.service";
import { PUT_TO_ELASTIC } from "../database/elasticsearch/elasticsearch.repository";

const router = express.Router();

const Service = container.resolve(StopService);

router.post("/create", currentUser, requireAuth, async (req: Request, res: Response) => {
	const data = req.body as IStop;
	const result = await Service.createStop(data);
	const elasticData = {
		stop_id: result.stop_id,
		stop_name: result.stop_name,
		stop_lat: result.stop_lat,
		stop_lon: result.stop_lon
	};
	await PUT_TO_ELASTIC("stop", elasticData);
	return res.status(201).json({ result });
});

router.get("/all", currentUser, requireAuth, async (req: Request, res: Response) => {
	const result = await Service.getAllStops();
	res.status(200).json({ result });
});

router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.getStopById(id);
	return res.json(200).json({ result });
});

router.patch("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const data = req.body as IStop;
	const id = req.params.id as string;
	const result = await Service.updateStop(id, data);
	return res.json(200).json({ result });
});

router.delete("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.deleteStop(id);
	return res.json(200).json({ result });
});

export { router as StopRouter };
