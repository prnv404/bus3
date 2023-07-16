import { Schedule, ScheduleAttrs } from "../models/schedule.model";

export class ScheduleRepsitory {
	constructor() {}

	async Create(data: ScheduleAttrs) {
		const schedule = await Schedule.build(data).save();
		return schedule;
	}

	async findById(id: string) {
		const schedule = await Schedule.findById(id);
		return schedule;
	}

	async findByName(name: string) {
		const schedule = await Schedule.findOne({ name });
		return schedule;
	}

	async findbyDepotCode(depotCode: string) {
		const schedule = await Schedule.findOne({ depotCode });
		return schedule;
	}

	async deleteById(id: string) {
		const schedule = await Schedule.findByIdAndDelete(id);
		return schedule;
	}
}
