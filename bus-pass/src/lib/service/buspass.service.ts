import { autoInjectable } from "tsyringe";
import { BusPassRepository } from "../database/repository/buspass.repository";
import { IBusPass } from "../database/model/buspass.model";
import { BadRequestError } from "@prnv404/bus3";
import { kafka_client } from "../../config/kafka.config";
import { PUBLISH_TICKET_CREATED } from "../../events/publisher/ticket.pass.created.publisher";

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
				passengerId: busPass.passengerId
			};
		}
		throw new BadRequestError("Something went wrong");
	}

	public async AddBalance(id: string, price: number) {
		const buspass = await this.findById(id);
		buspass.balance += price;
		await buspass.save();
		return buspass;
	}

	public async BusPassTransaction(data: { topic: string; id: string; userId: string; from: string; to: string; price: number }) {
		let { from, id, price, to, topic, userId } = data;
		const transaction = await this.repository.PassTransaction(id, price);
		topic = `/res/buspass/${topic.split("/")[3]}`;
		if (transaction === 404) return { message: "no bus pass found", topic };
		if (transaction === 401) return { message: "insufficient balance to procced transaction", topic };
		if (transaction === 400) return { message: "bus pass is not active", topic };
		if (transaction?.code === 200) {
			await new PUBLISH_TICKET_CREATED(kafka_client).publish({
				from,
				price,
				to,
				userId: transaction.userId
			});
			return {
				message: "transaction successfull",
				topic
			};
		}
	}
}
