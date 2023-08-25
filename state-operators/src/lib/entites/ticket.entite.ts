export interface TicketDTO {
	busNo: string;
	price: number;
	OperatorId: string;
	route: string;
	from: string;
	to: string;
	depotCode?: string;
}

export class Ticket implements TicketDTO {
	constructor(
		public readonly busNo: string,
		public readonly price: number,
		public readonly OperatorId: string,
		public readonly route: string,
		public readonly from: string,
		public readonly to: string,
		public readonly depotCode?: string
	) {}
}
