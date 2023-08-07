import { autoInjectable } from "tsyringe";
import { ITrip } from "../database/mongo/models/trip.model";
import { TripRepository } from "../database/mongo/repository/trip.repository";

@autoInjectable()
export class TripService {
	constructor(private readonly tripRepository: TripRepository) {}

	async createTrip(trip: ITrip): Promise<ITrip> {
		return this.tripRepository.create(trip);
	}

	async getTripById(id: string): Promise<ITrip | null> {
		return this.tripRepository.findById(id);
	}

	async updateTrip(id: string, updates: Partial<ITrip>): Promise<ITrip | null> {
		return this.tripRepository.update(id, updates);
	}

	async deleteTrip(id: string): Promise<void> {
		await this.tripRepository.delete(id);
	}
}
