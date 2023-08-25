export interface BusDTO {
	BusNo: string;
	type: string;
	operator: string;
	depotCode: string;
	seats: number;
}

export class Bus implements BusDTO {
	constructor(
		public readonly BusNo: string,
		public readonly type: string,
		public readonly operator: string,
		public readonly depotCode: string,
		public readonly seats: number
	) {}
}
