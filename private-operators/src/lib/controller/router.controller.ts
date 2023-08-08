import { currentUser, requireAuth } from "@prnv404/bus3";
import express, { IRoute, Request, Response } from "express";
import { container } from "tsyringe";
import { RouterService } from "../service/route.service";
import { PUT_TO_ELASTIC } from "../database/elasticsearch/elasticsearch.repository";

const router = express.Router();

const Service = container.resolve(RouterService);

export interface IRoutes {
	route_id: string;
	route_short_name: string;
	route_long_name: string;
	route_type: number;
}

router.post("/", currentUser, requireAuth, async (req: Request, res: Response) => {
	const data = req.body as IRoutes;

	const result = await Service.createNewRoute(data);
	await PUT_TO_ELASTIC("route", result);
	res.status(201).json({ result });
});

router.get("/", currentUser, requireAuth, async (req: Request, res: Response) => {
	const result = await Service.getAllRoutes();
	res.status(200).json({ result });
});

router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.getRouteById(id);
	res.status(200).json({ result });
});

router.patch("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const data = req.body as IRoutes;
	const result = await Service.updateRouteById(id, data);
	res.status(200).json({ result });
});

router.delete("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.deleteRouteById(id);
	res.status(200).json({ result });
});

export { router as RouteRouter };
