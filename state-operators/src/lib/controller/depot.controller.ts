import { Request, Response, Router } from "express";
import { DepotUseCase } from "../usecase/depot/depot.usecase";
import { ELASTIC_INDEX } from "@prnv404/bus3";
import { DepotAttrs } from "../app/database/mongo/models/depot.model";
import { ElasticSearchRepository } from "../app/database/elasticsearch/elasticsearch.repository";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class DepotController {
	constructor(
		private readonly Service: DepotUseCase,
		private readonly ElasticService: ElasticSearchRepository
	) {}

	createDepot = async (req: Request, res: Response) => {
		const { depotCode, district, name, Operator, lat, lng } = req.body as DepotAttrs;
		const depot = await this.Service.createDepots({ depotCode, district, name, Operator, lat, lng });

		// Add the Depot to elastic search
		await this.ElasticService.AddDoc(depot.id, ELASTIC_INDEX.DEPOT, depot);

		res.status(201).json({ depot });
	};

	GetAllDepot = async (req: Request, res: Response) => {
		const Depot = await this.Service.GetAllDepots();

		res.send(Depot);
	};
	GetDepotById = async (req: Request, res: Response) => {
		const id = req.params.id;

		const Depot = await this.Service.GetDepot(id);

		res.send(Depot);
	};

	EditDepot = async (req: Request, res: Response) => {
		const id = req.params.id;

		const { name, district, depotCode, Operator } = req.body as DepotAttrs;

		const depot = await this.Service.EditDepot(id, { name, district, depotCode, Operator });

		// Update in elastci search as well
		await this.ElasticService.UpdateDoc(depot.id, ELASTIC_INDEX.DEPOT, depot);

		res.send(depot);
	};

	DeleteDepot = async (req: Request, res: Response) => {
		const id = req.params.id;

		await this.Service.DeleteDepot(id);

		// Delete in Elastic Search as well
		await this.ElasticService.DeleteDoc(id, ELASTIC_INDEX.DEPOT);

		res.send({ message: "Depot Deleted Successfully" });
	};
}
