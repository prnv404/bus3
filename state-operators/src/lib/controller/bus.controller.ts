import { ELASTIC_INDEX } from "@prnv404/bus3";
import { Request, Response } from "express";
import { BusAttrs } from "../app/database/mongo/models/buses.model";
import { BusUseCase } from "../usecase/bus/bus.usecase";
import { ElasticSearchRepository } from "../app/database/elasticsearch/elasticsearch.repository";
import { autoInjectable } from "tsyringe";

const ElasticService = new ElasticSearchRepository();

@autoInjectable()
export class BusController {
	constructor(private readonly Service: BusUseCase) {}

	CreateBus = async (req: Request, res: Response) => {
		let data = req.body as BusAttrs;

		const bus = await this.Service.CreateBus(data);

		// Add to bus to elastic search
		const { BusNo, type, depotCode, seats, Operator } = bus;

		await ElasticService.AddDoc(bus.id, ELASTIC_INDEX.BUS, { BusNo, type, depotCode, seats, Operator });

		res.status(201).json(bus);
	};

	GetAllBus = async (req: Request, res: Response) => {
		const depotCode = req.query.depotCode as string;

		const buses = await this.Service.GetAllBus(depotCode);

		res.status(200).json(buses);
	};

	GetBus = async (req: Request, res: Response) => {
		const id = req.params.id;

		const bus = await this.Service.GetBus(id);

		res.status(200).json(bus);
	};

	EditBus = async (req: Request, res: Response) => {
		const id = req.params.id;

		let data = req.body as BusAttrs;

		const bus = await this.Service.EditBus(id, data);

		// update the bus in elastic search as well
		const { BusNo, type, depotCode, seats, Operator } = bus;

		await ElasticService.UpdateDoc(bus.id, ELASTIC_INDEX.BUS, { BusNo, type, depotCode, seats, Operator });

		res.status(200).json(bus);
	};

	DeleteBus = async (req: Request, res: Response) => {
		const id = req.params.id;

		const bus = await this.Service.DeleteBus(id);

		res.status(200).json(bus);
	};
}
