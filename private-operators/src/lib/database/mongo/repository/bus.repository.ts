import { Bus, BusAttrs } from "../models/bus.model";

export class BusRepository {
	constructor() {}

	async Create(data: BusAttrs) {
		const bus = await Bus.build(data).save();
		return bus;
	}

	async findbyId(id: string) {
		const bus = await Bus.findById(id);
		return bus;
	}

	async findByAll(OperatorId: string) {
		const buses = await Bus.find({ OperatorId });

		return buses;
	}

	async findBybusNo(BusNo: string) {
		const bus = await Bus.findOne({ BusNo });
		return bus;
	}

	async DeleteBydId(id: string) {
		const bus = await Bus.findByIdAndDelete(id);

		return bus;
	}
}
