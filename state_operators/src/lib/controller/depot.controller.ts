import express, { Request, Response, Router } from "express";
import { DepotRepository } from "../database/mongo/repository/depot.repository";
import { DepotService } from "../service/depot.service";
import { currentUser, requireAuth } from "@prnv404/bus3";
import { DepotAttrs } from "../database/mongo/models/depot.model";
import { ElasticSearchRepository } from "../database/elasticsearch/repository/elasticsearch.repository";

const router = express();

const Service = new DepotService(new DepotRepository());
const ElasticService = new ElasticSearchRepository();

router.post("/", currentUser, requireAuth, async (req: Request, res: Response) => {
	const { depotCode, district, name, Operator } = req.body as DepotAttrs;

	const depot = await Service.createDepots({ depotCode, district, name, Operator });

	// Add the Depot to elastic search

	res.status(201).json({ depot });
});

router.get("/all", currentUser, requireAuth, async (req: Request, res: Response) => {
	const Depot = await Service.GetAllDepots();

	res.send(Depot);
});

router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id;

	const Depot = await Service.GetDepot(id);

	res.send(Depot);
});

router.patch("/edit/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id;

	const { name, district, depotCode, Operator } = req.body as DepotAttrs;

	const Depot = await Service.EditDepot(id, { name, district, depotCode, Operator });

	// Update in elastci search as well

	res.send(Depot);
});

router.delete("/delete/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id;

	await Service.DeleteDepot(id);

	// Delete in Elastic Search as well

	res.send({ message: "Depot Deleted Successfully" });
});

router.delete("/delete/:id", currentUser, requireAuth, async (req: Request, res: Response) => {});

export { router as DepotRouter };
