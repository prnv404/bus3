import express, { Request, Response, Router } from "express";
import { DepotRepository } from "../database/mongo/repository/depot.repository";
import { DepotService } from "../service/depot.service";
import { ELASTIC_INDEX, currentUser, requireAuth, sanitizeData, validateRequest } from "@prnv404/bus3";
import { DepotAttrs } from "../database/mongo/models/depot.model";
import { ElasticSearchRepository } from "../database/elasticsearch/repository/elasticsearch.repository";
import { createDepotValidation } from "./validator/validator";
import { container } from "tsyringe";

const router = express();

// const Service = new DepotService(new DepotRepository());
const Service = container.resolve(DepotService);

const ElasticService = new ElasticSearchRepository();

router.post("/", sanitizeData, createDepotValidation, validateRequest, currentUser, requireAuth, async (req: Request, res: Response) => {
	const { depotCode, district, name, Operator, lat, lng } = req.body as DepotAttrs;
	const depot = await Service.createDepots({ depotCode, district, name, Operator, lat, lng });

	// Add the Depot to elastic search
	await ElasticService.AddDoc(depot.id, ELASTIC_INDEX.DEPOT, depot);

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

router.patch("/edit/:id", sanitizeData, currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id;

	const { name, district, depotCode, Operator } = req.body as DepotAttrs;

	const depot = await Service.EditDepot(id, { name, district, depotCode, Operator });

	// Update in elastci search as well
	await ElasticService.UpdateDoc(depot.id, ELASTIC_INDEX.DEPOT, depot);

	res.send(depot);
});

router.delete("/delete/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id;

	await Service.DeleteDepot(id);

	// Delete in Elastic Search as well
	await ElasticService.DeleteDoc(id, ELASTIC_INDEX.DEPOT);

	res.send({ message: "Depot Deleted Successfully" });
});

export { router as DepotRouter };
