import { autoInjectable } from "tsyringe";
import { ITrip } from "../../app/database/mongo/model/trip.model";
import { BadRequestError } from "@prnv404/bus3";
import { TripRepository } from "../../app/ repository/mongo/repository/trip.repository";

@autoInjectable()
export class TripUseCase {
	constructor(private readonly tripRepository: TripRepository) {}

	async createTrip(trip: ITrip): Promise<ITrip> {
		return this.tripRepository.create(trip);
	}

	async getTrips() {
		const result = await this.tripRepository.findAll();
		return result;
	}

	async getTripById(id: string): Promise<ITrip | null> {
		const result = await this.tripRepository.findById(id);
		if (!result) throw new BadRequestError("no trip found");
		return result;
	}

	async updateTrip(id: string, updates: Partial<ITrip>): Promise<ITrip | null> {
		return this.tripRepository.update(id, updates);
	}

	async deleteTrip(id: string) {
		return await this.tripRepository.delete(id);
	}
}
