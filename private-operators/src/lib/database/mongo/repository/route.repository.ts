import { IRoutes } from "../../../controller/router.controller";
import { IRoute, RouteModel } from "../models/route.model"; // Import the IRoute interface

export class RouteRepository {
	// Create a new route
	async createRoute(routeData: IRoutes): Promise<IRoute> {
		const newRoute = new RouteModel(routeData);
		return newRoute.save();
	}

	// Get all routes
	async getAllRoutes(): Promise<IRoute[]> {
		return RouteModel.find().exec();
	}

	// Get a route by ID
	async getRouteById(routeId: string): Promise<IRoute | null> {
		return RouteModel.findById(routeId).exec();
	}

	// Update a route by ID
	async updateRouteById(routeId: string, updateData: Partial<IRoute>): Promise<IRoute | null> {
		return RouteModel.findByIdAndUpdate(routeId, updateData, { new: true }).exec();
	}

	// Delete a route by ID
	async deleteRouteById(routeId: string): Promise<void> {
		await RouteModel.findByIdAndDelete(routeId).exec();
	}
}
