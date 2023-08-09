import { RouteRepository } from "../database/mongo/repository/route.repository";
import { injectable } from "tsyringe";
import { IRoutes } from "../controller/router.controller";
import { IRoute } from "../database/mongo/model/route.model";
import { BadRequestError } from "@prnv404/bus3";

@injectable()
export class RouterService {
	private readonly routeRepository: RouteRepository;
	constructor(routeRepository: RouteRepository) {
		this.routeRepository = routeRepository;
	}

	async createNewRoute(routeData: IRoutes): Promise<IRoute> {
		const newRoute = await this.routeRepository.createRoute(routeData);
		return newRoute;
	}

	async getAllRoutes(): Promise<IRoutes[]> {
		return await this.routeRepository.getAllRoutes();
	}

	async getRouteById(routeId: string): Promise<IRoutes | null> {
		const result = await this.routeRepository.getRouteById(routeId);
		if (!result) throw new BadRequestError("No Route found");
		return result;
	}

	async updateRouteById(routeId: string, updateData: Partial<IRoutes>): Promise<IRoutes | null> {
		const updatedRoute = await this.routeRepository.updateRouteById(routeId, updateData);
		return updatedRoute;
	}

	async deleteRouteById(routeId: string): Promise<void> {
		await this.getRouteById(routeId);
		await this.routeRepository.deleteRouteById(routeId);
	}
}
