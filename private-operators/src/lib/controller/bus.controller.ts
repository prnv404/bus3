import { currentUser, requireAuth, sanitizeData, validateRequest } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { BusAttrs } from "../database/mongo/models/bus.model";
import { container } from "tsyringe";
import { BusService } from "../service/bus.service";
import { EditBusValidation, busValidation } from "./validator/validator";
import { PUT_TO_ELASTIC } from "../database/elasticsearch/elasticsearch.repository";

const router = express.Router();

const Service = container.resolve(BusService);

router.post("/", sanitizeData, busValidation, validateRequest, currentUser, requireAuth, async (req: Request, res: Response) => {
	const { BusNo, seats, type } = req.body as BusAttrs;

	const OperatorId = req.currentUser?.id!;

	const bus = await Service.Create({ BusNo, OperatorId, seats, type });

	await PUT_TO_ELASTIC("bus", bus);

	res.status(201).json({ bus });
});

router.put("/:id", sanitizeData, EditBusValidation, validateRequest, currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id;

	const { BusNo, OperatorId, seats, type } = req.body as BusAttrs;

	const bus = await Service.EditBus(id, { BusNo, OperatorId, seats, type });

	res.status(200).json({ bus });
});

router.get("/busno", currentUser, requireAuth, async (req: Request, res: Response) => {
	const busNo = req.query.busno as string;

	const bus = await Service.findbyName(busNo);

	res.status(200).json({ bus });
});

router.get("/all", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.currentUser?.id!;

	const bus = await Service.findAll(id);

	res.status(200).json({ bus });
});

router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id;
	const bus = await Service.findById(id);

	res.status(200).json({ bus });
});

router.delete("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id;
	const bus = await Service.delete(id);

	res.status(200).json({ bus });
});

export { router as BusRouter };
