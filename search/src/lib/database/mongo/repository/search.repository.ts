import { IStop, StopModel } from "../model/stop.model";
import { StopsTimeModel } from "../model/stops.time.model";
import { TripModel } from "../model/trip.model";

export class SearchRepository {
	constructor() {}

	public async findStop(stop: string) {
		const result = await StopModel.findOne({ stop_name: stop });

		return result;
	}

	public async findStopTime(stop1: IStop, stop2: IStop) {
		const trips = await StopsTimeModel.find({
			stop_id: { $in: [stop1.stop_id, stop2.stop_id] }
		});
		return trips;
	}

	public async findTrips(data: any) {
		const trip = await TripModel.find({
			trip_id: { $in: data }
		});
		return trip;
	}

	public async findStoptimeOfTrip(tripId: string) {
		const stopTime = await StopsTimeModel.find({
			trip_id: { $in: [tripId] }
		}).sort({ stop_sequence: 1 });

		return stopTime;
	}
}
