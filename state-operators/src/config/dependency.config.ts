import { container } from "tsyringe";
import { AdminController } from "../lib/controller/admin.controller";
import { BusController } from "../lib/controller/bus.controller";
import { DepotController } from "../lib/controller/depot.controller";
import { EmployeeController } from "../lib/controller/employee.controller";
import { ScheduleController } from "../lib/controller/schedule.controller";
import { TicketController } from "../lib/controller/tikcet.controller";

export interface IDependencies {
	adminController: AdminController;
	busController: BusController;
	depotController: DepotController;
	employeeController: EmployeeController;
	scheduleController: ScheduleController;
	ticketController: TicketController;
}

const adminController = container.resolve(AdminController);
const busController = container.resolve(BusController);
const depotController = container.resolve(DepotController);
const employeeController = container.resolve(EmployeeController);
const scheduleController = container.resolve(ScheduleController);
const ticketController = container.resolve(TicketController);

export const dependencies: IDependencies = {
	adminController,
	busController,
	depotController,
	employeeController,
	scheduleController,
	ticketController
};
