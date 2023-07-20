import { Depot, DepotAttrs } from "../models/depot.model";

export class DepotRepository {
	async create(data: DepotAttrs) {
		const { depotCode, district, name, Operator, lat, lng } = data;

		const depot = Depot.build({ depotCode, district, name, Operator, lat, lng });

		return await depot.save();
	}

	async findAllDepot() {
		const result = await Depot.find();

		return result;
	}

	async findDepotByName(name: string) {
		const DepotExist = await Depot.findOne({ name });

		return DepotExist;
	}

	async findByDepotCode(DepotCode: string) {
		const DepotExist = await Depot.findOne({ depotCode: DepotCode });

		return DepotExist;
	}

	async findById(id: String) {
		const DepotExist = await Depot.findById(id);

		return DepotExist;
	}

	async deleteDepot(id: string) {
		const depot = await Depot.findByIdAndDelete(id);

		return depot;
	}
}
