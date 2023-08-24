import { container } from "tsyringe";
import { BusController } from "../lib/controller/bus.controller";
import { PvtOperatorController } from "../lib/controller/pvt.operator.controllet";
import { TicketController } from "../lib/controller/ticket.controller";

const busController = container.resolve(BusController);
const pvtController = container.resolve(PvtOperatorController);
const ticketController = container.resolve(TicketController);

export interface IDependencie {
	busController: BusController;
	pvtController: PvtOperatorController;
	ticketController: TicketController;
}

const dependency: IDependencie = {
	busController,
	pvtController,
	ticketController
};

export { dependency };
