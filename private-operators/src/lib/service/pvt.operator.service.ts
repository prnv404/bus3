import "reflect-metadata";
import { BadRequestError, Password } from "@prnv404/bus3";
import { PvtOperatorAttrs } from "../database/mongo/models/pvt-operator.model";
import { PvtOperatorRepository } from "../database/mongo/repository/pvt.operator.repository";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class PvtOperatorService {
	constructor(private readonly pvtRepository: PvtOperatorRepository) {}

	async Signup(data: PvtOperatorAttrs) {
		const operatorExist = await this.pvtRepository.findbyPhone(data.phone);

		if (operatorExist) throw new BadRequestError("Phone Number Already Exist");

		data.isVerified = false;

		const operator = await this.pvtRepository.Create(data);

		return operator;
	}

	async Signin(phone: string, password: string) {
		const operator = await this.pvtRepository.findbyPhone(phone);

		if (!operator) throw new BadRequestError("Operator dosent exist");

		if (operator.isVerified === false) throw new BadRequestError("Operator is not verified");

		const passwordCorrect = await Password.compare(operator.password, password);

		if (!passwordCorrect) throw new BadRequestError("Password was not Correct");

		return operator;
	}

	async Profile(id: string) {
		const operator = await this.pvtRepository.findbyId(id);

		if (!operator) throw new BadRequestError("Operator User Not found");

		return operator;
	}

	async VerifyOtp(otp: string, phone: string) {
		const user = await this.pvtRepository.findbyPhone(phone);

		if (!user) throw new BadRequestError("No User Found");

		const IsOtpCorrect = user.otp === otp;

		if (IsOtpCorrect === false) throw new BadRequestError("OTP is Not Correct");

		user.isVerified = true;

		await user.save();

		return user;
	}
}
