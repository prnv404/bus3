import { currentUser, requireAuth } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { container } from "tsyringe";
import { OrderService } from "../service/order.service";
import { razorpay } from "../../config/razorpay.config";
import crypto from "crypto";
import { ACTIVATE_BUSS_PASS } from "../../event/publisher/card.activate.publisher";
import { kafka_client } from "../../config/kafka.config";
import { ADD_BALANCE_PUBLISHER } from "../../event/publisher/add.balance.publisher";

const router = express.Router();

const Service = container.resolve(OrderService);

export interface ISuccessRazorpay {
	razorpay_payment_id: string;
	razorpay_order_id: string;
	razorpay_signature: string;
}

router.post("/pay-verify", async (req: Request, res: Response) => {
	const data = req.body as ISuccessRazorpay;
	const buspass = await Service.verifyPayment(data);
	if (buspass) {
		if (buspass?.addBalance === false) {
			await new ACTIVATE_BUSS_PASS(kafka_client).publish({
				busPassId: buspass?.busPassId,
				orderId: buspass?.orderId,
				status: "ACCEPTED",
				passengerId: buspass.passengerId
			});
		} else {
			await new ADD_BALANCE_PUBLISHER(kafka_client).publish({
				busPassId: buspass.busPassId,
				amount: buspass.amount
			});
		}
	}

	res.status(200);
});

router.get("/payment/:id", async (req: Request, res: Response) => {
	const paymentId = req.params.id as string;

	const order = await Service.findOrderById(paymentId);

	const options = {
		amount: order?.amount! * 100,
		currency: "INR",
		receipt: paymentId,
		payment_capture: 1
	};

	const response = await razorpay.orders.create(options);
	if (order) {
		order.orderId = response.id!;
		await order.save();
	}

	res.render("razorpay", { order_id: response.id, amount: order?.amount });
});

router.get("/capture", async (req: Request, res: Response) => {
	const data = crypto.createHmac("sha256", process.env.WEBHOOK_SECRET!);
	data.update(JSON.stringify(req.body));
	const digest = data.digest("hex");
	if (digest === req.headers["x-razorpay-signature"]) {
		console.log("request is legit");
		res.json({
			status: "ok"
		});
	} else {
		res.status(400).send("Invalid signature");
	}
});

router.get("/report", currentUser, requireAuth, async (req: Request, res: Response) => {
	const report = await Service.GetReports();
	res.json({ report });
});
router.get("/", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.currentUser?.id as string;

	const orders = await Service.findByPassenger(id);

	res.json({ orders });
});

router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const orderId = req.params.id as string;

	const order = await Service.findById(orderId);

	res.json({ order });
});

export { router as OrderRouter };
