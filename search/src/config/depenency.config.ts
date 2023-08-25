import { container } from "tsyringe";
import { RouteController } from "../lib/controller/router.controller";
import { SearchController } from "../lib/controller/search.controller";
import { StopController } from "../lib/controller/stop.controller";
import { StopTimeController } from "../lib/controller/stop.time.controller";
import { TripController } from "../lib/controller/trip.controller";

export interface IDependencie {
	routerController: RouteController;
	stopController: StopController;
	stopTimeController: StopTimeController;
	tripController: TripController;
	searchController: SearchController;
}

const routerController = container.resolve(RouteController);
const stopController = container.resolve(StopController);
const stopTimeController = container.resolve(StopTimeController);
const tripController = container.resolve(TripController);
const searchController = container.resolve(SearchController);

export const dependency: IDependencie = {
	routerController,
	searchController,
	stopController,
	stopTimeController,
	tripController
};
