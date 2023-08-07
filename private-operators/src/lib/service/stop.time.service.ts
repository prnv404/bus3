import { StopsTimeInterFace } from "../database/mongo/models/stops.time.model";
import { StopRepository } from "../database/mongo/repository/stop.repository";

export class StopTimeService {
	constructor(private readonly stopTimeRepsitory: StopRepository) {}

	public async createStoptime(data: StopsTimeInterFace) {
		const result = await this.stopTimeRepsitory.createStop(data);
		return result;
	}

	public async findByid(id: string) {
		return await this.stopTimeRepsitory.getStopById(id);
	}

	public async updateStopTime(stopId: string, data: Partial<StopsTimeInterFace>) {
		return await this.stopTimeRepsitory.updateStop(stopId, data);
	}

	public async delete(id: string) {
		return await this.stopTimeRepsitory.deleteStop(id);
	}
}
