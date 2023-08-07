import { TripModel, ITrip } from "../models/trip.model";

export class TripRepository {
	constructor() {}

	async create(trip: ITrip): Promise<ITrip> {
		return TripModel.create(trip);
	}

	async findById(id: string): Promise<ITrip | null> {
		return TripModel.findById(id).exec();
	}

	async update(id: string, updates: Partial<ITrip>): Promise<ITrip | null> {
		return TripModel.findByIdAndUpdate(id, updates, { new: true }).exec();
	}

	async delete(id: string): Promise<void> {
		await TripModel.findByIdAndDelete(id).exec();
	}
}
