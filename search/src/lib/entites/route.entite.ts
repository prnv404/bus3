export interface IRoute {
	route_id: string;
	route_short_name: string;
	route_long_name: string;
	route_type: string;
}

export class Route implements IRoute {
	constructor(
		public readonly route_id: string,
		public readonly route_short_name: string,
		public readonly route_long_name: string,
		public readonly route_type: string
	) {}
}
