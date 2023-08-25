export interface IStop {
	stop_id: string;
	stop_name: string;
	stop_lat: number;
	stop_lon: number;
}

export class Stop implements IStop {
	constructor(
		public readonly stop_id: string,
		public readonly stop_name: string,
		public readonly stop_lat: number,
		public readonly stop_lon: number
	) {}
}
