import { injectable } from "tsyringe";
import { IRoutes } from "../../controller/router.controller";
import { IRoute } from "../../app/database/mongo/model/route.model";
import { BadRequestError } from "@prnv404/bus3";
import { RouteRepository } from "../../app/ repository/mongo/repository/route.repository";

@injectable()
export class RouterUsecase {
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

	async getRouteById(routeId: string) {
		const result = await this.routeRepository.getRouteById(routeId);
		if (!result) throw new BadRequestError("No Route found");
		return result;
	}

	async updateRouteById(routeId: string, updateData: any) {
		const updatedRoute = await this.routeRepository.updateRouteById(routeId, updateData);
		return updatedRoute;
	}

	async deleteRouteById(routeId: string): Promise<void> {
		await this.getRouteById(routeId);
		await this.routeRepository.deleteRouteById(routeId);
	}
}
