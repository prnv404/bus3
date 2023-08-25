import { autoInjectable } from "tsyringe";
import { StopsTimeInterFace } from "../../app/database/mongo/model/stops.time.model";
import { BadRequestError } from "@prnv404/bus3";
import { SearchRepository } from "../../app/ repository/mongo/repository/search.repository";
import { StopsTimeRepository } from "../../app/ repository/mongo/repository/stop.time.repository";

@autoInjectable()
export class StopTimeUsecase {
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
