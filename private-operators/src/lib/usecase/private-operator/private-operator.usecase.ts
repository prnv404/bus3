import "reflect-metadata";
import { BadRequestError, Password } from "@prnv404/bus3";
import { autoInjectable } from "tsyringe";
import { PvtOperatorAttrs } from "../../app/database/mongo/models/pvt-operator.model";
import { PvtOperatorRepository } from "../../app/repository/mongo/pvt.operator.repository";
import { PvtOperator } from "../../entites";

@autoInjectable()
export class PvtOperatorUseCase {
	constructor(private readonly pvtRepository: PvtOperatorRepository) {}

	async Signup(data: PvtOperatorAttrs) {
		const operatorExist = await this.pvtRepository.findbyPhone(data.phone);

		if (operatorExist) throw new BadRequestError("Phone Number Already Exist");

		data.isVerified = false;

		const operator = await this.pvtRepository.Create(
			new PvtOperator(data.name, data.phone, data.district, data.otp, data.isVerified)
		);

		return operator;
	}

	async Signin(phone: string, otp: string) {
		const operator = await this.pvtRepository.findbyPhone(phone);

		if (!operator) throw new BadRequestError("Operator dosent exist");

		operator.otp = otp;

		await operator.save();

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

		user.otp = null;

		await user.save();

		return user;
	}
}
