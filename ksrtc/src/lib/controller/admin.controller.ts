import express, { Request, Response } from "express";
import { AdminService } from "../service/admin.service";
import { AdminRepository } from "../database/mongo/repository/admin.repository";
import jwt from "jsonwebtoken";
import { currentUser } from "@prnv404/bus3";
import { SENDOTPNOTIFICATION } from "../../events/publisher/otp.publisher";
import { kafka_client } from "../../config/kafka.config";

const router = express.Router();

const Service = new AdminService(new AdminRepository());

interface AdminInterface {
	phone: number;
	name: string;
	password: string;
	role: string;
}

router.post("/signup", async (req: Request, res: Response) => {
	const { name, password, phone, role } = req.body as AdminInterface;

	const otp = Math.floor(1000 + Math.random() * 9000);

	const user = await Service.signup({ name, password, phone, role, otp });

	// Send Event to kafka for OTP Notification

	await new SENDOTPNOTIFICATION(kafka_client).publish({
		userId: user.id,
		phone: user.phone,
		otp: String(user.otp),
		message: "YOUR ONE TIME VEIFIFCATION CODE IS "
	});

	res.status(201).send({ message: "OTP Sended To Your PhoneNumber " });
});

router.post("/signin", async (req: Request, res: Response) => {
	const { password, phone } = req.body as AdminInterface;

	const user = await Service.signin(phone, password);

	const userJwt = jwt.sign({ id: user.id, phone: user.phone, isVerified: user.isVerified }, process.env.JWT_KEY!);

	req.session = {
		jwt: userJwt
	};

	res.status(200).send({ message: "Logged IN SuccessFully" });
});

router.delete("/signout", async (req: Request, res: Response) => {
	req.session = null;

	res.status(200).send({ message: "SignOut  SuccessFully" });
});

router.post("/verify-otp", async (req: Request, res: Response) => {
	const { otp, phone } = req.body;

	const user = await Service.VerifyOtp(otp, phone);

	const userJwt = jwt.sign({ id: user.id, phone: user.phone, isVerified: true }, process.env.JWT_KEY!);

	req.session = {
		jwt: userJwt
	};

	res.status(200).send({ message: "Logged IN SuccessFully" });
});

router.get("/profile", currentUser, async (req: Request, res: Response) => {
	const Id = req.currentUser?.id;

	const user = await Service.Profile(Id!);

	res.send({ user });
});

export { router as AdminRouter };
