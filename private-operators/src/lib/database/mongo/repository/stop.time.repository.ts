import { IStopsTime, StopsTimeModel } from "../models/stops.time.model";

export class StopsTimeRepository {
	constructor() {}

	async create(stopTime: IStopsTime): Promise<IStopsTime> {
		return StopsTimeModel.create(stopTime);
	}

	async findById(id: string): Promise<IStopsTime | null> {
		return StopsTimeModel.findById(id).exec();
	}

	async update(id: string, updates: Partial<IStopsTime>): Promise<IStopsTime | null> {
		return StopsTimeModel.findByIdAndUpdate(id, updates, { new: true }).exec();
	}

	async delete(id: string): Promise<void> {
		await StopsTimeModel.findByIdAndDelete(id).exec();
	}
}
