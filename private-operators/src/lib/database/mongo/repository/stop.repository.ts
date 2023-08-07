import { Model } from "mongoose";
import { StopModel, IStop } from "../models/stop.model";

export class StopRepository {
	async createStop(stopData: Partial<IStop>): Promise<IStop> {
		return StopModel.create(stopData);
	}

	async getStopById(stopId: string): Promise<IStop | null> {
		return StopModel.findById(stopId).exec();
	}

	async getAllStops(): Promise<IStop[]> {
		return StopModel.find({}).exec();
	}

	async updateStop(stopId: string, updateData: Partial<IStop>): Promise<IStop | null> {
		return StopModel.findByIdAndUpdate(stopId, updateData, { new: true }).exec();
	}

	async deleteStop(stopId: string): Promise<boolean> {
		const result = await StopModel.deleteOne({ _id: stopId }).exec();
		return result.deletedCount !== 0;
	}
}
