export interface ScheduleDTO {
	name: string;
	BusNo: string;
	start: string;
	stop: string;
	route: string;
	depotCode: string;
	operator: string;
	driver?: string;
	conductor?: string;
}

export class Schedule implements ScheduleDTO {
	constructor(
		public readonly name: string,
		public readonly BusNo: string,
		public readonly start: string,
		public readonly stop: string,
		public readonly route: string,
		public readonly depotCode: string,
		public readonly operator: string,
		public readonly driver?: string,
		public readonly conductor?: string
	) {}
}
