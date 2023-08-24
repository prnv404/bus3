export interface PvtOperatorDTO {
	name: string;
	phone: string;
	district: string;
	otp: string | null;
	isVerified?: boolean;
	buses?: string[];
	routes?: string[];
}

export class PvtOperator implements PvtOperatorDTO {
	constructor(
		public readonly name: string,
		public readonly phone: string,
		public readonly district: string,
		public readonly otp: string | null,
		public readonly isVerified: boolean = false,
		public readonly buses: string[] = [],
		public readonly routes: string[] = []
	) {}
}
