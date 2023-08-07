import { currentUser, requireAuth } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { container } from "tsyringe";
import { CalendarService } from "../service/calender.service";
import { ICalendar } from "../database/mongo/models/calender.model";

const router = express.Router();

const Service = container.resolve(CalendarService);

router.post("/calender", currentUser, requireAuth, async (req: Request, res: Response) => {
	const data = req.body as ICalendar;
	const result = await Service.createCalendar(data);
	res.status(201).json({ result });
});

router.get("/calender/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.getCalendarById(id);
	res.status(200).json({ result });
});

router.get("/calender/service/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.getCalendarByServiceId(id);
	res.status(200).json({ result });
});

router.put("/calender/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const data = req.body as ICalendar;
	const result = await Service.updateCalendar(id, data);
	res.status(200).json({ result });
});

router.delete("/calender/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.deleteCalendar(id);
	res.status(200).json({ result });
});
