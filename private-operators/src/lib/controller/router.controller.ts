import { currentUser, requireAuth } from "@prnv404/bus3";
import express, { IRoute, Request, Response } from "express";
import { container } from "tsyringe";
import { RouterService } from "../service/route.service";

const router = express.Router();

const Service = container.resolve(RouterService);

export interface IRoutes {
	route_id: string;
	route_short_name: string;
	route_long_name: string;
	route_type: number;
}

router.post("/create", currentUser, requireAuth, async (req: Request, res: Response) => {
	const data = req.body as IRoutes;

	const result = await Service.createNewRoute(data);

	res.json(201).json({ result });
});

router.get("/all", currentUser, requireAuth, async (req: Request, res: Response) => {
	const result = await Service.getAllRoutes();
	res.json(200).json({ result });
});

router.get("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.getRouteById(id);
	res.json(200).json({ result });
});

router.patch("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const data = req.body as IRoutes;
	const result = await Service.updateRouteById(id, data);
	res.json(200).json({ result });
});

router.delete("/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const result = await Service.deleteRouteById(id);
	res.json(200).json({ result });
});
