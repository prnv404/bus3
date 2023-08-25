import { currentUser, requireAuth } from "@prnv404/bus3";
import { Request, Response } from "express";
import { autoInjectable, container } from "tsyringe";
import { RouterUsecase } from "../usecase/route/route.service";

export interface IRoutes {
	route_id: string;
	route_short_name: string;
	route_long_name: string;
	route_type: string;
}
@autoInjectable()
export class RouteController {
	constructor(private readonly Service: RouterUsecase) {}

	CreaeRoute = async (req: Request, res: Response) => {
		const data = req.body as IRoutes;
		const result = await this.Service.createNewRoute(data);
		res.status(201).json({ result });
	};
	GetAllRoute = async (req: Request, res: Response) => {
		const result = await this.Service.getAllRoutes();
		res.status(200).json({ result });
	};

	GetRouteById = async (req: Request, res: Response) => {
		const id = req.params.id as string;
		const result = await this.Service.getRouteById(id);
		res.status(200).json({ result });
	};

	UpdateRouteById = async (req: Request, res: Response) => {
		const id = req.params.id as string;
		const data = req.body as IRoutes;
		const result = await this.Service.updateRouteById(id, data);
		res.status(200).json({ result });
	};

	DeleteRouteById = async (req: Request, res: Response) => {
		const id = req.params.id as string;
		const result = await this.Service.deleteRouteById(id);
		res.status(200).json({ result });
	};
}
