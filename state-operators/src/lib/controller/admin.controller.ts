import { Request, Response } from "express";
import { AdminUseCase } from "../usecase/admin/admin.usecase";
import jwt from "jsonwebtoken";
import { SENDOTPNOTIFICATION } from "../../events/publisher/otp.publisher";
import { kafka_client } from "../../config/kafka.config";
import { autoInjectable } from "tsyringe";

interface AdminInterface {
	phone: number;
	name: string;
	password: string;
	role: string;
	Operator: string;
}

@autoInjectable()
export class AdminController {
	constructor(private readonly Service: AdminUseCase) {}

	Signup = async (req: Request, res: Response) => {
		const { name, password, phone, role, Operator } = req.body as AdminInterface;

		const otp = Math.floor(1000 + Math.random() * 9000);

		const user = await this.Service.signup({ name, password, phone, role, otp, Operator });

		// Send Event to kafka for OTP Notification

		await new SENDOTPNOTIFICATION(kafka_client).publish({
			userId: user.id,
			phone: user.phone,
			otp: String(user.otp),
			message: "YOUR ONE TIME VERIFIFCATION CODE IS "
		});

		res.status(201).send({ message: "OTP Sended To Your PhoneNumber " + phone });
	};

	Signin = async (req: Request, res: Response) => {
		const { password, phone } = req.body as AdminInterface;

		const user = await this.Service.signin(phone, password);

		const userJwt = jwt.sign({ id: user.id, phone: user.phone, isVerified: user.isVerified }, process.env.JWT_KEY!);

		req.session = {
			jwt: userJwt
		};

		res.status(200).send({ message: "Logged IN SuccessFully" });
	};

	Signout = async (req: Request, res: Response) => {
		req.session = null;

		res.status(200).send({ message: "SignOut  SuccessFully" });
	};

	VerifyOTP = async (req: Request, res: Response) => {
		const { otp, phone } = req.body;

		const user = await this.Service.VerifyOtp(otp, phone);

		const userJwt = jwt.sign({ id: user.id, phone: user.phone, isVerified: true }, process.env.JWT_KEY!);

		req.session = {
			jwt: userJwt
		};

		res.status(200).send({ message: "Logged IN SuccessFully" });
	};

	GetProfile = async (req: Request, res: Response) => {
		const Id = req.currentUser?.id;

		const user = await this.Service.Profile(Id!);

		res.send({ user });
	};
}
