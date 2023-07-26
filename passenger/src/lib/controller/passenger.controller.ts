import express, { Request, Response } from "express";
import { PassengertAttrs } from "../database/mongo/model/passenger.model";
import { container } from "tsyringe";
import { currentUser, requireAuth, sanitizeData, validateRequest } from "@prnv404/bus3";
import { PassengerService } from "../service/passenger.service";
import { busValidation, editValidatoin, routeValidation, scheduleValidation } from "./validator/passenger.validator";

const router = express();

const Service = container.resolve(PassengerService);

router.get("/", currentUser, requireAuth, async (req: Request, res: Response) => {
	const passengerId = req.currentUser?.id!;
	const passenger = await Service.GetProfie(passengerId);
	res.status(200).json({ passenger });
});

router.put("/edit", sanitizeData, editValidatoin, validateRequest, currentUser, requireAuth, async (req: Request, res: Response) => {
	const passengerId = req.currentUser?.id!;
	const data = req.body as PassengertAttrs;
	const passenger = await Service.EditProfile(passengerId, data);
	res.status(200).json({ passenger });
});

router.post("/bus", busValidation, validateRequest, sanitizeData, currentUser, requireAuth, async (req: Request, res: Response) => {
	const passengerId = req.currentUser?.id!;
	const { busNo, addDelete } = req.body;
	console.log(req.body);
	const passenger = await Service.Bus(passengerId, busNo, addDelete);
	res.status(200).json({ passenger });
});

router.post(
	"/schedule",
	scheduleValidation,
	validateRequest,
	sanitizeData,
	currentUser,
	requireAuth,
	async (req: Request, res: Response) => {
		const passengerId = req.currentUser?.id!;
		const { scheduleId, addDelete } = req.body;
		const passenger = await Service.Schedule(passengerId, scheduleId, addDelete);
		res.status(200).json({ passenger });
	}
);

router.post("/route", routeValidation, validateRequest, sanitizeData, currentUser, requireAuth, async (req: Request, res: Response) => {
	const passengerId = req.currentUser?.id!;
	const { routeId, addDelete } = req.body;
	const passenger = await Service.BusRoute(passengerId, routeId, addDelete);
	res.status(200).json({ passenger });
});

export { router as PassengerRouter };
