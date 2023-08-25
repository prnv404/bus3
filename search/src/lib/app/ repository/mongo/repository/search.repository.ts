import { RouteModel } from "../../../database/mongo/model/route.model";
import { StopModel, IStop } from "../../../database/mongo/model/stop.model";
import { StopsTimeModel } from "../../../database/mongo/model/stops.time.model";
import { TripModel } from "../../../database/mongo/model/trip.model";

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

	public async findTripByRoute(routeId: string) {
		const trips = await TripModel.find({
			route_id: { $in: [routeId] }
		});
		return trips;
	}

	public async routeByname(routename: string) {
		const routeId = await RouteModel.findOne({
			$or: [
				{
					route_long_name: routename
				},
				{
					route_short_name: routename
				},
				{
					route_id: routename
				}
			]
		});
		return routeId;
	}
}
