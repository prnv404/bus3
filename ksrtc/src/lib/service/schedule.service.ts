import { BadRequestError } from "@prnv404/bus3";
import { ScheduleAttrs } from "../database/mongo/models/schedule.model";
import { ScheduleRepsitory } from "../database/mongo/repository/schedule.repository";

export class ScheduleService {
	constructor(private readonly scheduleRepsitory: ScheduleRepsitory) {}

	async Create(data: ScheduleAttrs) {
		const ScheduleExist = await this.scheduleRepsitory.findByName(data.name);

		if (ScheduleExist) throw new BadRequestError("Schedule Already Exist");

		const Schedule = await this.scheduleRepsitory.Create(data);
	}
}
