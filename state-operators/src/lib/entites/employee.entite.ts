export interface EmployeeDTO {
	name: string;
	type: string;
	Operator: string;
	depotCode: string;
	phone: number;
}

export class Employee implements EmployeeDTO {
	constructor(
		public readonly name: string,
		public readonly type: string,
		public readonly Operator: string,
		public readonly depotCode: string,
		public readonly phone: number
	) {}
}
