import { StopRepository } from "../database/mongo/repository/stop.repository";
import { IStop } from "../database/mongo/models/stop.model";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class StopService {
	constructor(private readonly stopRepository: StopRepository) {}

	async createStop(stopData: Partial<IStop>): Promise<IStop> {
		return this.stopRepository.createStop(stopData);
	}

	async getStopById(stopId: string): Promise<IStop | null> {
		return this.stopRepository.getStopById(stopId);
	}

	async getAllStops(): Promise<IStop[]> {
		return this.stopRepository.getAllStops();
	}

	async updateStop(stopId: string, updateData: Partial<IStop>): Promise<IStop | null> {
		return this.stopRepository.updateStop(stopId, updateData);
	}

	async deleteStop(stopId: string): Promise<boolean> {
		return this.stopRepository.deleteStop(stopId);
	}
}
