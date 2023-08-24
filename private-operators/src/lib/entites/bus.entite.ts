export interface BusDTO {
	busNo: string;
	type: string;
	operatorId: string;
	seats: number;
}

export class Bus implements BusDTO {
	public readonly busNo!: string;
	public readonly type!: string;
	public readonly operatorId!: string;
	public readonly seats!: number;
	constructor(data: BusDTO) {
		this.busNo = data.busNo;
		this.operatorId = data.operatorId;
		this.type = data.type;
		this.seats = data.seats;
	}
}
