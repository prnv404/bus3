import { autoInjectable } from "tsyringe";
import { StopsTimeInterFace } from "../database/mongo/model/stops.time.model";
import { StopsTimeRepository } from "../database/mongo/repository/stop.time.repository";
import { SearchRepository } from "../database/mongo/repository/search.repository";
import { BadRequestError } from "@prnv404/bus3";

@autoInjectable()
export class StopTimeService {
	constructor(
		private readonly stopTimeRepsitory: StopsTimeRepository,
		private readonly searchRepository: SearchRepository
	) {}

	public async createStoptime(data: StopsTimeInterFace) {
		const result = await this.stopTimeRepsitory.create(data);
		return result;
	}

	public async findByid(id: string) {
		return await this.stopTimeRepsitory.findById(id);
	}

	public async findStopTimeOfTrip(tripId: string) {
		return await this.searchRepository.findStoptimeOfTrip(tripId);
	}

	public async updateStopTime(stopId: string, data: Partial<StopsTimeInterFace>) {
		return await this.stopTimeRepsitory.update(stopId, data);
	}

	public async delete(id: string) {
		const stop = await this.findByid(id);
		if (!stop) throw new BadRequestError("No StopTime Found");
		return await this.stopTimeRepsitory.delete(id);
	}
}
