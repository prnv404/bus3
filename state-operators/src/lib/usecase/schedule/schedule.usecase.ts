import "reflect-metadata";

import { BadRequestError } from "@prnv404/bus3";
import { ScheduleAttrs } from "../../app/database/mongo/models/schedule.model";
import { autoInjectable } from "tsyringe";
import { ScheduleRepsitory } from "../../app/repository/mongo/schedule.repository";

@autoInjectable()
export class ScheduleUseCase {
	constructor(private readonly scheduleRepsitory: ScheduleRepsitory) {}

	async Create(data: ScheduleAttrs) {
		const ScheduleExist = await this.scheduleRepsitory.findByName(data.name);

		if (ScheduleExist) throw new BadRequestError("Schedule Already Exist");

		const Schedule = await this.scheduleRepsitory.Create(data);

		return Schedule;
	}

	async findById(id: string) {
		const schedule = await this.scheduleRepsitory.findById(id);

		if (!schedule) throw new BadRequestError("No Schedule Found");

		return schedule;
	}

	async findByname(name: string) {
		const schedule = await this.scheduleRepsitory.findByName(name);

		if (!schedule) throw new BadRequestError("No Schedule Found");

		return schedule;
	}

	async findByDepotCode(depotCode: string) {
		const schedule = await this.scheduleRepsitory.findbyDepotCode(depotCode);

		if (!schedule) throw new BadRequestError("No Schedule Found");

		return schedule;
	}

	async EditSchedule(id: string, data: ScheduleAttrs) {
		const schedule = await this.scheduleRepsitory.findById(id);

		if (!schedule) throw new BadRequestError("No Schedule  Found");

		schedule.BusNo = data.BusNo || schedule.BusNo;

		schedule.name = data.name || schedule.name;

		schedule.depotCode = data.depotCode || schedule.depotCode;

		schedule.start = data.start || schedule.start;

		schedule.stop = data.stop || schedule.stop;

		schedule.route = data.route || schedule.route;

		await schedule.save();

		return schedule;
	}

	async DeleteSchedule(id: string) {
		await this.findById(id);

		const schedule = await this.scheduleRepsitory.deleteById(id);

		return schedule;
	}

	async Assign(scheduleId: string, driver: string, conductor: string) {
		const schedule = await this.scheduleRepsitory.findById(scheduleId);

		if (!schedule) throw new BadRequestError("NO Schedule Found !");

		schedule.driver = driver;
		schedule.conductor = conductor;

		await schedule.save();

		return schedule;
	}
}
