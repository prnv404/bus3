import { autoInjectable } from "tsyringe";
import { PassengerRepository } from "../database/mongo/repository/passenger.repository";
import { PassengerDoc, PassengertAttrs } from "../database/mongo/model/passenger.model";
import { BadRequestError, Password } from "@prnv404/bus3";

@autoInjectable()
export class AuthService {
	constructor(private readonly passegerRepository: PassengerRepository) {}

	async SignUp(data: PassengertAttrs) {
		let passenger = (await this.passegerRepository.findByPhone(data.phone)) as PassengerDoc;
		if (passenger) throw new BadRequestError("This Phone Number is Already Exist ");
		data.isVerified = false;
		passenger = await this.passegerRepository.Create(data);
		return passenger;
	}

	async SignIn(phone: string, password: string) {
		const passenger = await this.passegerRepository.findByPhone(phone);
		console.log(passenger);
		if (!passenger) throw new BadRequestError("This Mobile Number is not registerd!");
		if (passenger.isVerified === false) throw new BadRequestError("Your Phone Number is Not verified");
		const PasswordMatch = await Password.compare(passenger.password, password);
		if (!PasswordMatch) throw new BadRequestError("Password was incorrect");
		return passenger;
	}

	async VerifyOtp(phone: string, otp: string) {
		const passenger = await this.passegerRepository.findByPhone(phone);
		if (!passenger) throw new BadRequestError("no user found ");
		if (passenger.otp !== otp) throw new BadRequestError("otp is not correct");
		passenger.isVerified = true;
		await passenger.save();
		return passenger;
	}

	async GetProfile(id: string) {
		const passenger = await this.passegerRepository.findById(id);
		if (!passenger) throw new BadRequestError("No Passenger Found ");
		return passenger;
	}
}
