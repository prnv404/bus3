import { Bus, BusAttrs } from "../../../app/database/mongo/models/buses.model";

export class BusRepository {
	constructor() {}

	async createBus(data: BusAttrs) {
		const bus = Bus.build(data);

		await bus.save();

		return bus;
	}

	async findById(id: string) {
		const bus = await Bus.findById(id);
		return bus;
	}

	async findByDepot(depotCode: String) {
		const bus = await Bus.find({ depotCode });

		return bus;
	}

	async findByBusNo(BusNo: string) {
		const bus = await Bus.findOne({ BusNo });

		return bus;
	}

	async deleteBusById(id: string) {
		const bus = await Bus.findByIdAndDelete(id);

		return bus;
	}
}
