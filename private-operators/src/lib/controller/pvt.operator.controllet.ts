import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { OtpValidation, PvtOperatorSigninValidaton } from "./validator/validator";
import { currentUser, requireAuth, validateRequest } from "@prnv404/bus3";
import { PvtOperatorAttrs } from "../database/mongo/models/pvt-operator.model";
import { PvtOperatorService } from "../service/pvt.operator.service";
import { SENDOTPNOTIFICATION } from "../../events/publisher/otp.publisher";
import { kafka_client } from "../../config/kafka.config";
import { container } from "tsyringe";

const router = express.Router();

const Service = container.resolve(PvtOperatorService);

router.post("/signin", PvtOperatorSigninValidaton, validateRequest, async (req: Request, res: Response) => {
	const { phone } = req.body as PvtOperatorAttrs;

	const otp = String(Math.floor(1000 + Math.random() * 9000));

	const operator = await Service.Signin(phone, otp);

	await new SENDOTPNOTIFICATION(kafka_client).publish({
		userId: operator.id,
		phone: Number(operator.phone),
		otp,
		message: "YOUR ONE TIME VERIFICATION CODE IS "
	});

	res.status(200).send({ message: "otp sended to you phone number" });
});

router.delete("/signout", currentUser, requireAuth, async (req: Request, res: Response) => {
	req.session = null;

	res.status(200).send({ message: "Logged Out SuccessFully" });
});

router.post("/verifyOtp", OtpValidation, validateRequest, async (req: Request, res: Response) => {
	const { otp, phone } = req.body as PvtOperatorAttrs;

	const operator = await Service.VerifyOtp(otp!, phone);

	const userJwt = jwt.sign({ id: operator.id, phone: operator.phone, isVerified: operator.isVerified }, process.env.JWT_KEY!);

	req.session = {
		jwt: userJwt
	};

	res.status(200).send({ message: "LogedIn  SuccessFully" });
});

router.get("/profile", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.currentUser?.id!;

	const operator = await Service.Profile(id);

	res.status(200).json(operator);
});

export { router as PvtOperatorRouter };
