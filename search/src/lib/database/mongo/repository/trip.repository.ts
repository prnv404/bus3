import { TripModel, ITrip } from "../model/trip.model";

export class TripRepository {
	constructor() {}

	async create(trip: ITrip): Promise<ITrip> {
		return await TripModel.create(trip);
	}

	async findById(id: string): Promise<ITrip | null> {
		return await TripModel.findById(id).exec();
	}

	async findAll() {
		return await TripModel.find({});
	}

	async update(id: string, updates: Partial<ITrip>): Promise<ITrip | null> {
		return await TripModel.findByIdAndUpdate(id, updates, { new: true }).exec();
	}

	async delete(id: string) {
		return await TripModel.findByIdAndDelete(id).exec();
	}
}
