import { IRoute } from "express";
import { IRoutes } from "../../../../controller/router.controller";
import { RouteModel } from "../../../database/mongo/model/route.model";

export class RouteRepository {
	async createRoute(routeData: IRoutes) {
		const newRoute = new RouteModel(routeData);
		return newRoute.save();
	}

	async getAllRoutes() {
		return RouteModel.find().exec();
	}

	async getRouteById(routeId: string): Promise<IRoute | null> {
		return RouteModel.findById(routeId);
	}

	async updateRouteById(routeId: string, updateData: IRoute) {
		return RouteModel.findByIdAndUpdate(routeId, updateData, { new: true }).exec();
	}

	async deleteRouteById(routeId: string): Promise<void> {
		await RouteModel.findByIdAndDelete(routeId).exec();
	}
}
