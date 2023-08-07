import { RouteRepository } from "../database/mongo/repository/route.repository";
import { IRoute } from "../database/mongo/models/route.model";
import { injectable } from "tsyringe";
import { IRoutes } from "../controller/router.controller";

@injectable()
export class RouterService {
	private readonly routeRepository: RouteRepository; // Inject the RouteRepository if you have one

	constructor(routeRepository: RouteRepository) {
		this.routeRepository = routeRepository;
	}

	// Add any other business logic methods relevant to your controller here

	// Example of a method to create a new route
	async createNewRoute(routeData: IRoutes): Promise<IRoute> {
		// Add any validation or additional logic before creating the route
		const newRoute = await this.routeRepository.createRoute(routeData);
		// Add any post-creation logic or transformations if necessary
		return newRoute;
	}

	// Example of a method to get all routes
	async getAllRoutes(): Promise<IRoutes[]> {
		// Add any pre-retrieval logic if needed
		return this.routeRepository.getAllRoutes();
	}

	// Example of a method to get a route by ID
	async getRouteById(routeId: string): Promise<IRoutes | null> {
		// Add any pre-retrieval logic if needed
		return this.routeRepository.getRouteById(routeId);
	}

	// Example of a method to update a route by ID
	async updateRouteById(routeId: string, updateData: Partial<IRoutes>): Promise<IRoutes | null> {
		// Add any validation or pre-update logic if necessary
		const updatedRoute = await this.routeRepository.updateRouteById(routeId, updateData);
		// Add any post-update logic or transformations if needed
		return updatedRoute;
	}

	// Example of a method to delete a route by ID
	async deleteRouteById(routeId: string): Promise<void> {
		// Add any pre-deletion logic if needed
		await this.routeRepository.deleteRouteById(routeId);
		// Add any post-deletion logic if needed
	}
}
