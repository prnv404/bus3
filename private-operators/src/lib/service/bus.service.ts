import "reflect-metadata";
import { BadRequestError } from "@prnv404/bus3";
import { BusAttrs } from "../database/mongo/models/bus.model";
import { BusRepository } from "../database/mongo/repository/bus.repository";
import { autoInjectable } from "tsyringe";
import { PvtOperatorRepository } from "../database/mongo/repository/pvt.operator.repository";

@autoInjectable()
export class BusService {
	constructor(
		private readonly busRepository: BusRepository,
		private readonly operatorRepository: PvtOperatorRepository
	) {}

	async Create(data: BusAttrs) {
		const busExist = await this.busRepository.findBybusNo(data.BusNo);

		const operator = await this.operatorRepository.findbyId(data.OperatorId);

		if (!operator) throw new BadRequestError("No operator Exist !!");

		if (busExist) throw new BadRequestError("Bus Number Already Exist");

		const bus = await this.busRepository.Create(data);

		operator.buses?.push(bus.id);

		await operator.save();

		return bus;
	}

	async findAll(OperatorId: string) {
		const buses = await this.busRepository.findByAll(OperatorId);
		return buses;
	}

	async findById(id: string) {
		const bus = await this.busRepository.findbyId(id);

		if (!bus) throw new BadRequestError("NO bus Found");

		return bus;
	}

	async findbyName(busNo: string) {
		const bus = await this.busRepository.findBybusNo(busNo);
		if (!bus) throw new BadRequestError("NO Bus Found ");
		return bus;
	}

	async EditBus(id: string, data: BusAttrs) {
		let bus = await this.busRepository.findbyId(id);

		if (!bus) throw new BadRequestError("NO bus Found ");

		bus.BusNo = data.BusNo || bus.BusNo;

		bus.type = data.type || bus.type;

		bus.seats = data.seats || bus.seats;

		await bus.save();

		return bus;
	}

	async delete(id: string) {
		let bus = await this.busRepository.findbyId(id);

		if (!bus) throw new BadRequestError("NO bus Found ");

		bus = await this.busRepository.DeleteBydId(id);

		return bus;
	}
}