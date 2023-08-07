import { currentUser, requireAuth } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { container } from "tsyringe";
import { StopTimeService } from "../service/stop.time.service";
import { StopsTimeInterFace } from "../database/mongo/models/stops.time.model";

const router = express.Router();

const Service = container.resolve(StopTimeService);

router.post("/stoptime", currentUser, requireAuth, async (req: Request, res: Response) => {
	const data = req.body as StopsTimeInterFace;
	const result = await Service.createStoptime(data);
	res.status(201).json({ result });
});

router.get("/stoptime/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.findByid(id);
	res.status(200).json({ result });
});

router.put("/stoptime/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const data = req.body as StopsTimeInterFace;
	const result = await Service.updateStopTime(id, data);
	res.status(200).json({ result });
});

router.delete("/stoptime/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.delete(id);
	res.status(200).json({ result });
});
