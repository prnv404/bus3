import { BadRequestError } from "@prnv404/bus3";
import { SearchRepository } from "../database/mongo/repository/search.repository";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class SearchService {
	constructor(private readonly repository: SearchRepository) {}

	public async search(start: string, end: string) {
		const startExist = await this.repository.findStop(start);
		const endExit = await this.repository.findStop(end);
		if (!startExist || !endExit) throw new BadRequestError("No Stop found");
		const stopTime = await this.repository.findStopTime(startExist, endExit);
		const arr = stopTime.map((item) => item.trip_id);
		const trips = await this.repository.findTrips(arr);
		return trips;
	}

	public async getTimeOfTrip(tripId: string) {
		const stopTime = await this.repository.findStoptimeOfTrip(tripId);
		return stopTime;
	}

	public async GetTripByRouteName(routename: string) {
		const routeId = await this.repository.routeByname(routename);
		if (!routeId) throw new BadRequestError("NO route found");
		const trips = await this.repository.findTripByRoute(routeId.route_id);
		return trips;
	}
}
