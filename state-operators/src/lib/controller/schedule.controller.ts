import { ELASTIC_INDEX, currentUser, requireAuth, sanitizeData, validateRequest } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { ScheduleAttrs } from "../database/mongo/models/schedule.model";
import { ScheduleService } from "../service/schedule.service";
import { ScheduleRepsitory } from "../database/mongo/repository/schedule.repository";
import { ElasticSearchRepository } from "../database/elasticsearch/repository/elasticsearch.repository";
import { assignDriverAndConductor, createScheduleValidation } from "./validator/validator";
import { container } from "tsyringe";

const router = express();

const Service = container.resolve(ScheduleService);
const ElasticService = new ElasticSearchRepository();

router.post("/", sanitizeData, createScheduleValidation, validateRequest, currentUser, requireAuth, async (req: Request, res: Response) => {
	const data = req.body as ScheduleAttrs;

	const schedule = await Service.Create(data);

	// Create Schedule in Elastic Search
	await ElasticService.AddDoc(schedule.id, ELASTIC_INDEX.SCHEDULE, schedule);

	res.status(201).json(schedule);
});

router.get("/", currentUser, requireAuth, async (req: Request, res: Response) => {
	const name = req.query.name as string;

	let schedule = await Service.findByname(name);

	res.status(200).json(schedule);
});

router.get("/all", currentUser, requireAuth, async (req: Request, res: Response) => {
	const depotCode = req.query.depotCode as string;

	let schedules = await Service.findByDepotCode(depotCode);

	res.status(200).json(schedules);
});

router.patch("/edit/:id", sanitizeData, currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id;
	const data = req.body as ScheduleAttrs;

	const schedule = await Service.EditSchedule(id, data);

	await ElasticService.UpdateDoc(schedule.id, ELASTIC_INDEX.SCHEDULE, schedule);

	res.status(200).json(schedule);
});

router.delete("/delete/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id;

	await Service.DeleteSchedule(id);

	await ElasticService.DeleteDoc(id, ELASTIC_INDEX.SCHEDULE);

	res.status(200).json({ message: "Schedule Deleted SuccessFully" });
});

router.post(
	"/assign",
	sanitizeData,
	assignDriverAndConductor,
	validateRequest,
	currentUser,
	requireAuth,
	async (req: Request, res: Response) => {
		const { conductor, driver, scheduleId } = req.body;

		await Service.Assign(scheduleId, driver, conductor);

		res.status(201).json({ message: "Driver And Conductor Assigned" });
	}
);

router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id;

	let schedule = await Service.findById(id);

	res.status(200).json(schedule);
});

export { router as ScheduleRouter };
