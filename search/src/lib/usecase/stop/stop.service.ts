import { StopRepository } from "../../app/ repository/mongo/repository/stop.repository";
import { IStop } from "../../app/database/mongo/model/stop.model";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class StopUseCase {
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
