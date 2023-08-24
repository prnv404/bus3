import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import jwt from "jsonwebtoken";
import { SENDOTPNOTIFICATION } from "../../events/publisher/otp.publisher";
import { kafka_client } from "../../config/kafka.config";
import { PvtOperatorAttrs } from "../app/database/mongo/models/pvt-operator.model";
import { PvtOperatorUseCase } from "../usecase/private-operator/private-operator.usecase";

@autoInjectable()
export class PvtOperatorController {
	constructor(private readonly Service: PvtOperatorUseCase) {}

	signin = async (req: Request, res: Response) => {
		const { phone } = req.body as PvtOperatorAttrs;

		const otp = String(Math.floor(1000 + Math.random() * 9000));

		const operator = await this.Service.Signin(phone, otp);

		await new SENDOTPNOTIFICATION(kafka_client).publish({
			userId: operator.id,
			phone: Number(operator.phone),
			otp,
			message: "YOUR ONE TIME VERIFICATION CODE IS "
		});

		res.status(200).send({ message: "otp sent to your phone number" });
	};

	signout = async (req: Request, res: Response) => {
		req.session = null;

		res.status(200).send({ message: "Logged Out Successfully" });
	};

	verifyOtp = async (req: Request, res: Response) => {
		const { otp, phone } = req.body as PvtOperatorAttrs;

		const operator = await this.Service.VerifyOtp(otp!, phone);

		const userJwt = jwt.sign({ id: operator.id, phone: operator.phone, isVerified: operator.isVerified }, process.env.JWT_KEY!);

		req.session = {
			jwt: userJwt
		};

		res.status(200).send({ message: "LoggedIn Successfully" });
	};

	getProfile = async (req: Request, res: Response) => {
		const id = req.currentUser?.id!;

		const operator = await this.Service.Profile(id);

		res.status(200).json(operator);
	};
}
