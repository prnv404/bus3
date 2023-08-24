import "reflect-metadata";
import { BadRequestError } from "@prnv404/bus3";
import { autoInjectable } from "tsyringe";
import { BusAttrs } from "../../app/database/mongo/models/bus.model";
import { BusRepository } from "../../app/repository/mongo/bus.repository";
import { PvtOperatorRepository } from "../../app/repository/mongo/pvt.operator.repository";
import { Bus, BusDTO } from "../../entites";

@autoInjectable()
export class BusUseCase {
	constructor(
		private readonly busRepository: BusRepository,
		private readonly operatorRepository: PvtOperatorRepository
	) {}

	async Create(data: BusDTO) {
		const { busNo, operatorId, seats, type } = data;

		const busExist = await this.busRepository.findBybusNo(data.busNo);

		const operator = await this.operatorRepository.findbyId(data.operatorId);

		if (!operator) throw new BadRequestError("No operator Exist !!");

		if (busExist) throw new BadRequestError("Bus Number Already Exist");

		const bus = await this.busRepository.Create(new Bus({ busNo, operatorId, seats, type }));

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
