import express from "express";
import { IDependencie } from "../config/depenency.config";
import { currentUser, requireAuth } from "@prnv404/bus3";
import { RouteController } from "../lib/controller/router.controller";

export = (dependencie: IDependencie) => {
	const { routerController } = dependencie;
	const router = express.Router();
	router.post("/", currentUser, requireAuth, routerController.CreaeRoute);
	router.get("/all", currentUser, requireAuth, routerController.GetAllRoute);
	router.get("/:id", currentUser, requireAuth, routerController.GetRouteById);
	router.patch("/:id", currentUser, requireAuth, routerController.UpdateRouteById);
	router.delete("/:id", currentUser, requireAuth, routerController.DeleteRouteById);
	return router;
};
