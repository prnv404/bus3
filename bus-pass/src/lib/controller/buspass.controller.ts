import { currentUser, requireAuth } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { IBusPass } from "../database/model/buspass.model";
import { container } from "tsyringe";
import { BusPassService } from "../service/buspass.service";
import { PUBLISH_BUSSPASS_CREATED } from "../../events/publisher/pass.created.publiser";
import { kafka_client } from "../../config/kafka.config";

const router = express.Router();

export const Service = container.resolve(BusPassService);

router.post("/", currentUser, requireAuth, async (req: Request, res: Response) => {
	const data = req.body as IBusPass;
	data.isActive = false;
	data.passengerId = req.currentUser?.id!;
	const busPass = await Service.CreateBusPass(data);
	await new PUBLISH_BUSSPASS_CREATED(kafka_client).publish({
		busPassId: busPass.id,
		userId: data.passengerId
	});
	res.status(201).json({ message: "Bus pass created succesfully make the payment for further use ", result: busPass });
});

router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const busPass = await Service.findById(id);
	res.json({ busPass });
});

router.get("/balance/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const balance = await Service.GetBalance(id);
	res.json({ balance });
});

router.post("/balance", currentUser, requireAuth, async (req: Request, res: Response) => {
	const { id, price } = req.body;
	const balance = await Service.AddBalance(id, price);
	res.json({ balance });
});

export { router as BussPassRouter };
