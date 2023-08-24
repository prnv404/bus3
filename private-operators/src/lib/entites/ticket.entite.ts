export interface TicketDTO {
	busNo: string;
	price: number;
	operatorId: string;
	route: string;
	from: string;
	to: string;
}

export class Ticket implements TicketDTO {
	constructor(
		public readonly busNo: string,
		public readonly price: number,
		public readonly operatorId: string,
		public readonly route: string,
		public readonly from: string,
		public readonly to: string
	) {}
}
