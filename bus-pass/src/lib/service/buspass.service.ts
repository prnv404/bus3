import { autoInjectable } from "tsyringe";
import { BusPassRepository } from "../database/repository/buspass.repository";
import { IBusPass } from "../database/model/buspass.model";
import { BadRequestError } from "@prnv404/bus3";

@autoInjectable()
export class BusPassService {
	constructor(private readonly repository: BusPassRepository) {}

	public async CreateBusPass(data: IBusPass) {
		const BusPassExist = await this.repository.findByPassengerId(data.passengerId);
		if (BusPassExist) throw new BadRequestError("Already BusPass Exist");
		const busPass = await this.repository.create(data);
		return busPass;
	}

	public async findById(id: string) {
		const buspass = await this.repository.findById(id);
		if (!buspass) throw new BadRequestError("No Bus pass found");
		return buspass;
	}

	public async GetBalance(id: string) {
		const busPass = await this.findById(id);
		if (busPass) {
			return {
				balance: busPass.balance,
				passengerId: busPass.passengerId,
				endDate: busPass.endDate
			};
		}
		throw new BadRequestError("Something went wrong");
	}

	public async BusPassTransaction(id: string, price: number, topic: string) {
		const transaction = await this.repository.PassTransaction(id, price);
		topic = `/res/buspass/${topic.split("/")[2]}`;
		if (transaction === 404) return { message: "no bus pass found", topic };
		if (transaction === 400) return { message: "insufficient balance to procced transaction", topic };
		if (transaction === 200) return { message: "transaction successfull", topic };
	}
}
