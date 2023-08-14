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
		const session = await mongoose.startSession();
		session.startTransaction();
		const option = { session };
		try {
			const busPass = await BuspassModel.findById(id);
			if (!busPass) {
				return 404;
			}
			if (busPass.balance < ticketPrice) {
				return 400;
			}
			const newBalance = busPass.balance - ticketPrice;
			await BuspassModel.findByIdAndUpdate(busPass._id, { balance: newBalance }, option);
			await session.commitTransaction();
			session.endSession();
			return 200;
		} catch (error) {
			console.error("Error during transaction:", error);
			await session.abortTransaction();
			session.endSession();
		}
	}
}
