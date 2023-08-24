import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { BusUseCase } from "../usecase/bus/bus.usecase";
import { PUT_TO_ELASTIC } from "../app/database/elasticsearch/elasticsearch.repository";
import { BusAttrs } from "../app/database/mongo/models/bus.model";
import { BusDTO } from "../entites";

@autoInjectable()
export class BusController {
	constructor(private readonly Service: BusUseCase) {}

	createBus = async (req: Request, res: Response) => {
		const { busNo, seats, type } = req.body as BusDTO;

		const operatorId = req.currentUser?.id!;

		const bus = await this.Service.Create({ busNo, operatorId, seats, type });

		await PUT_TO_ELASTIC("bus", bus);

		res.status(201).json({ bus });
	};

	updateBus = async (req: Request, res: Response) => {
		const id = req.params.id;

		const { BusNo, operatorId, seats, type } = req.body as BusAttrs;

		const bus = await this.Service.EditBus(id, { BusNo, operatorId, seats, type });

		res.status(200).json({ bus });
	};

	getBusNo = async (req: Request, res: Response) => {
		const busNo = req.query.busno as string;

		const bus = await this.Service.findbyName(busNo);

		res.status(200).json({ bus });
	};

	getBusAll = async (req: Request, res: Response) => {
		const id = req.currentUser?.id!;

		const bus = await this.Service.findAll(id);

		res.status(200).json({ bus });
	};

	getBusById = async (req: Request, res: Response) => {
		const id = req.params.id;
		const bus = await this.Service.findById(id);

		res.status(200).json({ bus });
	};

	deleteBus = async (req: Request, res: Response) => {
		const id = req.params.id;
		const bus = await this.Service.delete(id);

		res.status(200).json({ bus });
	};
}
