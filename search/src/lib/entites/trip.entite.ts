export interface ITrip {
	route_id: string;
	service_id: string;
	trip_id: string;
	busNo: string;
}

export class Trip implements ITrip {
	constructor(
		public readonly route_id: string,
		public readonly service_id: string,
		public readonly trip_id: string,
		public readonly busNo: string
	) {}
}
