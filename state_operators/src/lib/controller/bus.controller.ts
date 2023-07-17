import { currentUser, requireAuth, validateRequest } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { BusAttrs } from "../database/mongo/models/buses.model";
import { BusService } from "../service/bus.service";
import { BusRepository } from "../database/mongo/repository/bus.repository";
import { DepotRepository } from "../database/mongo/repository/depot.repository";
import { ElasticSearchRepository } from "../database/elasticsearch/repository/elasticsearch.repository";

const router = express();

const Service = new BusService(new BusRepository(), new DepotRepository());
const ElasticService = new ElasticSearchRepository();

router.post("/", currentUser, requireAuth, async (req: Request, res: Response) => {
	let data = req.body as BusAttrs;

	const bus = await Service.CreateBus(data);

	// Add to bus to elastic search
	const { BusNo, type, depotCode, seats, Operator } = bus;

	await ElasticService.PushToElasticSearch(bus.id, "bus", { BusNo, type, depotCode, seats, Operator });

	res.status(201).json(bus);
});

router.get("/all", currentUser, requireAuth, async (req: Request, res: Response) => {
	const depotCode = req.query.depotCode as string;

	const buses = await Service.GetAllBus(depotCode);

	res.status(200).json(buses);
});

router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id;

	const bus = await Service.GetBus(id);

	res.status(200).json(bus);
});

router.patch("/edit/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id;

	let data = req.body as BusAttrs;

	const bus = await Service.EditBus(id, data);

	// update the bus in elastic search as well
	const { BusNo, type, depotCode, seats, Operator } = bus;

	await ElasticService.UpdateDoc(bus.id, "bus", { BusNo, type, depotCode, seats, Operator });

	res.status(200).json(bus);
});

router.delete("/delete/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id;

	const bus = await Service.DeleteBus(id);

	res.status(200).json(bus);
});

export { router as BusRouter };
