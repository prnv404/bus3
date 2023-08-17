import { currentUser, requireAuth } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { IBusPass } from "../database/model/buspass.model";
import { container } from "tsyringe";
import { BusPassService } from "../service/buspass.service";
import { PUBLISH_BUSSPASS_CREATED } from "../../events/publisher/pass.created.publiser";
import { kafka_client } from "../../config/kafka.config";
import { PUBLISH_PASS_ORDER } from "../../events/publisher/pass.order.created.publisher";
import { v4 as uuidv4 } from "uuid";

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

	const paymentId = uuidv4();

	await new PUBLISH_PASS_ORDER(kafka_client).publish({
		userId: busPass.passengerId,
		busPassId: busPass.id,
		amount: data.balance,
		paymentId,
		addBalance: false
	});
	res.status(201).json({ message: "Procceed with payment ", paymentId, busPass });
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
	const { id, balance } = req.body;
	const busPass = await Service.findById(id);
	const paymentId = uuidv4();
	await new PUBLISH_PASS_ORDER(kafka_client).publish({
		userId: busPass.passengerId,
		busPassId: busPass.id,
		amount: balance,
		paymentId,
		addBalance: true
	});
	res.json({ message: "PROCCED WITH YOUR TRANSACTION", paymentId });
});

export { router as BussPassRouter };
