import { BadRequestError } from "@prnv404/bus3";
import { PassengerRepository } from "../database/mongo/repository/passenger.repository";
import { PassengertAttrs } from "../database/mongo/model/passenger.model";
import { autoInjectable } from "tsyringe";
import { TICKET_PASS_CREATED } from "../../events/listener/ticket.created.buspass.listener";

@autoInjectable()
export class PassengerService {
	constructor(private readonly passengerRepository: PassengerRepository) {}

	async GetProfie(id: string) {
		const passenger = await this.passengerRepository.findById(id);
		if (!passenger) throw new BadRequestError("passenger not found");
		return passenger;
	}

	async EditProfile(id: string, data: PassengertAttrs) {
		let passenger = await this.passengerRepository.findById(id);
		if (!passenger) throw new BadRequestError("No Passenger Found");
		passenger = await this.passengerRepository.editProfile(id, data);
		return passenger;
	}

	async BusRoute(passengerId: string, routeId: string, addDelete: boolean) {
		let passenger = await this.passengerRepository.findById(passengerId);
		if (!passenger) throw new BadRequestError("Passenger not found ");
		if (addDelete) {
			if (passenger.favRoute.includes(routeId)) throw new BadRequestError("Route Already Exist");
			passenger.favRoute.push(routeId);
		} else passenger.favRoute = passenger.favRoute.filter((item) => item != routeId);
		await passenger.save();
		return passenger;
	}
	async Bus(passengerId: string, BusNo: string, addDelete: boolean) {
		let passenger = await this.passengerRepository.findById(passengerId);
		if (!passenger) throw new BadRequestError("Passenger not found ");
		if (addDelete) {
			if (passenger.favBus.includes(BusNo)) throw new BadRequestError("Bus Already Exist");
			passenger.favBus.push(BusNo);
		} else passenger.favBus = passenger.favBus.filter((item) => item != BusNo);
		await passenger.save();
		return passenger;
	}
	async Schedule(passengerId: string, scheduleId: string, addDelete: boolean) {
		let passenger = await this.passengerRepository.findById(passengerId);
		if (!passenger) throw new BadRequestError("Passenger not found ");
		if (addDelete) {
			if (passenger.favSchedule.includes(scheduleId)) throw new BadRequestError("schedule Already Exist");
			passenger.favSchedule.push(scheduleId);
		} else passenger.favSchedule = passenger.favSchedule.filter((item) => item != scheduleId);
		console.log(passenger.favSchedule);
		await passenger.save();
		return passenger;
	}

	async addBusPassId(id: string, buspassId: string) {
		const passenger = await this.GetProfie(id);
		passenger.busPassId = buspassId;
		await passenger.save();
		return passenger;
	}

	async addTickets(data: TICKET_PASS_CREATED["data"]) {
		try {
			console.log(data);
			const passenger = await this.GetProfie(data.userId);
			passenger.purchasedTickets.push(data);
			await passenger.save();
			return passenger;
		} catch (error) {
			console.log(error);
		}
	}
}
