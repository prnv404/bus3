import { autoInjectable } from "tsyringe";
import { BusPassRepository } from "../database/repository/buspass.repository";
import { IBusPass } from "../database/model/buspass.model";
import { BadRequestError } from "@prnv404/bus3";
import { kafka_client } from "../../config/kafka.config";
import { PUBLISH_TICKET_CREATED } from "../../events/publisher/ticket.pass.created.publisher";
import { TicketEventToSrt } from "../../events/publisher/ticket.created.srt";
import { TicketEventToPvt } from "../../events/publisher/ticket.created.pvt";

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

	public async BusPassTransaction(data: {
		topic: string;
		id: string;
		userId: string;
		from: string;
		to: string;
		price: number;
		OperatorId: string;
		srt: boolean;
		busNo: string;
		route: string;
	}) {
		console.log(data);
		let { from, id, price, to, topic, srt, OperatorId, busNo, route } = data;
		const transaction = await this.repository.PassTransaction(id, price);
		topic = `/res/buspass/${topic.split("/")[3]}`;
		if (transaction?.code === 404) return { message: "no bus pass found", topic };
		if (transaction?.code === 401) return { message: "insufficient balance to procced transaction", topic };
		if (transaction?.code === 400) return { message: "bus pass is not active", topic };
		if (transaction?.code === 200 && transaction !== undefined) {
			await new PUBLISH_TICKET_CREATED(kafka_client).publish({
				from,
				price,
				to,
				userId: transaction.userId!
			});

			if (srt) {
				await new TicketEventToSrt(kafka_client).publish({
					busNo,
					from,
					OperatorId,
					price,
					route,
					to
				});
			} else {
				await new TicketEventToPvt(kafka_client).publish({
					busNo,
					from,
					OperatorId,
					price,
					route,
					to
				});
			}

			return {
				message: "transaction successfull",
				topic
			};
		}
	}
}
