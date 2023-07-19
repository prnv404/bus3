import { BadRequestError } from "@prnv404/bus3";
import { BusAttrs } from "../database/mongo/models/buses.model";
import { BusRepository } from "../database/mongo/repository/bus.repository";
import { DepotRepository } from "../database/mongo/repository/depot.repository";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class BusService {
	constructor(
		private readonly busRepository: BusRepository,
		private readonly depotRepsitory: DepotRepository
	) {}

	async CreateBus(data: BusAttrs) {
		const BusExist = await this.busRepository.findByBusNo(data.BusNo);

		if (BusExist) throw new BadRequestError("Bus Already Exist");

		const bus = await this.busRepository.createBus(data);

		const findByDepot = await this.depotRepsitory.findByDepotCode(data.depotCode);

		if (!findByDepot) throw new BadRequestError("findByDepot Not found !");

		findByDepot.buses.push(bus.id);

		await findByDepot.save();

		return bus;
	}

	async GetBus(id: string) {
		const bus = await this.busRepository.findById(id);

		if (!bus) throw new BadRequestError("NO Bus Found ");

		return bus;
	}

	async GetAllBus(DepotCode: String) {
		const buses = await this.busRepository.findByDepot(DepotCode);

		return buses;
	}

	async EditBus(id: string, data: BusAttrs) {
		const bus = await this.busRepository.findById(id);

		if (!bus) throw new BadRequestError("No Bus found !");

		bus.BusNo = data.BusNo || bus.BusNo;
		bus.depotCode = data.depotCode || bus.depotCode;
		bus.seats = data.seats || bus.seats;
		bus.type = data.type || bus.type;

		await bus.save();

		return bus;
	}

	async DeleteBus(id: string) {
		let bus = await this.busRepository.findById(id);

		if (!bus) throw new BadRequestError("NO Bus Found");

		bus = await this.busRepository.deleteBusById(id);

		const depot = await this.depotRepsitory.findByDepotCode(bus?.depotCode!);

		if (depot?.buses) {
			depot.buses = depot?.buses.filter((busId) => {
				return busId !== bus!.id;
			});
		}

		await depot?.save();

		return bus;
	}
}
