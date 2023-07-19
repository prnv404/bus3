import { BadRequestError, Password } from "@prnv404/bus3";
import { AdminAttrs } from "../database/mongo/models/admin.model";
import { AdminRepository } from "../database/mongo/repository/admin.repository";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class AdminService {
	constructor(private readonly adminRepository: AdminRepository) {}

	async signup(data: AdminAttrs) {
		const AdminExist = await this.adminRepository.findByPhone(data.phone);

		if (AdminExist && AdminExist.isVerified) throw new BadRequestError("Admin User Already Exist ");

		const CreateAdmin = await this.adminRepository.create(data);

		return CreateAdmin;
	}

	async signin(phone: number, password: string) {
		const AdminExist = await this.adminRepository.findByPhone(phone);

		if (!AdminExist) throw new BadRequestError("No Admin Found");

		const PasswordCorrect = await Password.compare(AdminExist.password, password);

		if (!PasswordCorrect) throw new BadRequestError("Password was not correct");

		return AdminExist;
	}

	async Profile(id: string) {
		const AdminExist = await this.adminRepository.findById(id);

		if (!AdminExist) throw new BadRequestError("Admin User Not found");

		return AdminExist;
	}

	async VerifyOtp(otp: number, phone: number) {
		const user = await this.adminRepository.findByPhone(phone);

		if (!user) throw new BadRequestError("No User Found");

		const IsOtpCorrect = user.otp === Number(otp);

		if (IsOtpCorrect === false) throw new BadRequestError("OTP is Not Correct");

		user.isVerified = true;

		await user.save();

		return user;
	}
}
