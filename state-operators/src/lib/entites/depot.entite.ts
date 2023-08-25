export interface DepotDTO {
	name: string;
	depotCode: string;
	district: string;
	Operator: string;
	lat?: string;
	lng?: string;
	employees?: string[];
	buses?: string[];
	routes?: string[];
}

export class Depot implements DepotDTO {
	constructor(
		public readonly name: string,
		public readonly depotCode: string,
		public readonly district: string,
		public readonly Operator: string,
		public readonly lat?: string,
		public readonly lng?: string,
		public readonly employees: string[] = [],
		public readonly buses: string[] = [],
		public readonly routes: string[] = []
	) {}
}
