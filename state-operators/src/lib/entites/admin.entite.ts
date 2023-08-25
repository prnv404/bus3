export interface AdminDTO {
	name: string;
	role: string;
	phone: number;
	password: string;
	operator: string;
	otp?: number;
}

export class Admin implements AdminDTO {
	constructor(
		public readonly name: string,
		public readonly role: string,
		public readonly phone: number,
		public readonly password: string,
		public readonly operator: string,
		public readonly otp?: number
	) {}
}
