import express, { Request, Response } from "express";
import { PassengertAttrs } from "../database/mongo/model/passenger.model";
import { container } from "tsyringe";
import { AuthService } from "../service/auth.service";
import jwt from "jsonwebtoken";
import { currentUser, requireAuth, sanitizeData, validateRequest } from "@prnv404/bus3";
import { SENDOTPNOTIFICATION } from "../../events/publisher/otp.publisher";
import { kafka_client } from "../../config/kafka.config";
import { authvalidation, signinValidation, verifyValidation } from "./validator/auth.validator";

const router = express();

const Service = container.resolve(AuthService);

router.post("/signup", sanitizeData, authvalidation, validateRequest, async (req: Request, res: Response) => {
	const data = req.body as PassengertAttrs;
	data.otp = String(Math.floor(1000 + Math.random() * 9000));
	const passenger = await Service.SignUp(data);
	await new SENDOTPNOTIFICATION(kafka_client).publish({
		userId: passenger.id,
		otp: passenger.otp,
		phone: Number(passenger.phone),
		message: "your one time otp is :"
	});
	res.status(201).json({ message: "otp sended to your mobile number" });
});

router.post("/signin", sanitizeData, signinValidation, validateRequest, async (req: Request, res: Response) => {
	const { phone, password } = req.body;
	const passenger = await Service.SignIn(phone, password);
	const userJwt = jwt.sign({ id: passenger.id, phone: passenger.phone, isVerified: passenger.isVerified }, process.env.JWT_KEY!);
	req.session = {
		jwt: userJwt
	};
	res.status(200).send({ message: "logged in successfully" });
});

router.post("/verify", sanitizeData, verifyValidation, validateRequest, async (req: Request, res: Response) => {
	const { phone, otp } = req.body;
	const passenger = await Service.VerifyOtp(phone, otp);
	const userJwt = jwt.sign({ id: passenger.id, phone: passenger.phone, isVerified: passenger.isVerified }, process.env.JWT_KEY!);
	req.session = {
		jwt: userJwt
	};
	res.status(200).send({ message: "logged in successfully" });
});

router.delete("/signout", currentUser, requireAuth, async (req: Request, res: Response) => {
	req.session = null;
	res.status(200).send({ message: "signout  successfully" });
});

export { router as AuthRouter };
