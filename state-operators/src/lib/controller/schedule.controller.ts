import { ELASTIC_INDEX, currentUser, requireAuth, sanitizeData, validateRequest } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { ScheduleAttrs } from "../app/database/mongo/models/schedule.model";
import { ElasticSearchRepository } from "../app/database/elasticsearch/elasticsearch.repository";
import { assignDriverAndConductor, createScheduleValidation } from "../../routes/validator/validator";
import { autoInjectable, container } from "tsyringe";
import { ScheduleUseCase } from "../usecase/schedule/schedule.usecase";

const router = express();

@autoInjectable()
export class ScheduleController {
	constructor(
		private readonly Service: ScheduleUseCase,
		private readonly ElasticService: ElasticSearchRepository
	) {}
	createScheule = async (req: Request, res: Response) => {
		const data = req.body as ScheduleAttrs;

		const schedule = await this.Service.Create(data);

		// Create Schedule in Elastic Search
		await this.ElasticService.AddDoc(schedule.id, ELASTIC_INDEX.SCHEDULE, schedule);

		res.status(201).json(schedule);
	};

	FindyByname = async (req: Request, res: Response) => {
		const name = req.query.name as string;

		let schedule = await this.Service.findByname(name);

		res.status(200).json(schedule);
	};

	FindByDepotCode = async (req: Request, res: Response) => {
		const depotCode = req.query.depotCode as string;

		let schedules = await this.Service.findByDepotCode(depotCode);

		res.status(200).json(schedules);
	};

	EditSchedule = async (req: Request, res: Response) => {
		const id = req.params.id;
		const data = req.body as ScheduleAttrs;

		const schedule = await this.Service.EditSchedule(id, data);

		await this.ElasticService.UpdateDoc(schedule.id, ELASTIC_INDEX.SCHEDULE, schedule);

		res.status(200).json(schedule);
	};

	DeleteScheule = async (req: Request, res: Response) => {
		const id = req.params.id;

		await this.Service.DeleteSchedule(id);

		await this.ElasticService.DeleteDoc(id, ELASTIC_INDEX.SCHEDULE);

		res.status(200).json({ message: "Schedule Deleted SuccessFully" });
	};

	AssignEmployee = async (req: Request, res: Response) => {
		const { conductor, driver, scheduleId } = req.body;

		await this.Service.Assign(scheduleId, driver, conductor);

		res.status(201).json({ message: "Driver And Conductor Assigned" });
	};

	FindById = async (req: Request, res: Response) => {
		const id = req.params.id;

		let schedule = await this.Service.findById(id);

		res.status(200).json(schedule);
	};
}
