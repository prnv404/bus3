import { IRoutes } from "../../../controller/router.controller";
import { IRoute, RouteModel } from "../model/route.model"; // Import the IRoute interface

export class RouteRepository {
	async createRoute(routeData: IRoutes): Promise<IRoute> {
		const newRoute = new RouteModel(routeData);
		return newRoute.save();
	}

	async getAllRoutes(): Promise<IRoute[]> {
		return RouteModel.find().exec();
	}

	async getRouteById(routeId: string): Promise<IRoute | null> {
		return RouteModel.findById(routeId);
	}

	async updateRouteById(routeId: string, updateData: Partial<IRoute>): Promise<IRoute | null> {
		return RouteModel.findByIdAndUpdate(routeId, updateData, { new: true }).exec();
	}

	async deleteRouteById(routeId: string): Promise<void> {
		await RouteModel.findByIdAndDelete(routeId).exec();
	}
}
