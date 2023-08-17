import mongoose from "mongoose";
import BuspassModel, { IBusPass } from "../model/buspass.model";

export class BusPassRepository {
	async create(data: IBusPass) {
		return await BuspassModel.create(data);
	}

	async findById(id: string) {
		return await BuspassModel.findById(id);
	}

	async findByPassengerId(id: string) {
		return await BuspassModel.findOne({
			passengerId: id
		});
	}

	async AddBalance(id: string, balance: number) {
		const buspass = await BuspassModel.findById(id);
		if (buspass) {
			buspass.balance = balance;
		}
		await buspass?.save();
		return buspass;
	}

	async PassTransaction(id: string, ticketPrice: number) {
		try {
			const busPass = await BuspassModel.findById(id);
			console.log(busPass);
			if (busPass?.isActive == false) {
				return {
					code: 200
				};
			}
			if (!busPass) {
				return {
					code: 404
				};
			}
			if (busPass.balance < ticketPrice) {
				return {
					code: 401
				};
			}
			const newBalance = busPass.balance - ticketPrice;
			await BuspassModel.findByIdAndUpdate(busPass._id, { balance: newBalance });
			return {
				code: 200,
				userId: busPass.passengerId
			};
		} catch (error) {
			console.error("Error during transaction:", error);
		}
	}
}
