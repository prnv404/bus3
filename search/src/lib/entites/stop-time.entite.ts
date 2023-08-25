export interface StopsTimeInterFace {
	trip_id: string;
	arrival_time: string;
	departure_time: string;
	stop_id: string;
	stop_sequence: number;
}

export class StopTime implements StopsTimeInterFace {
	constructor(
		public readonly trip_id: string,
		public readonly arrival_time: string,
		public readonly departure_time: string,
		public readonly stop_id: string,
		public readonly stop_sequence: number
	) {}
}
