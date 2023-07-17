import { ScheduleService } from "./schedule.service";
import { ScheduleRepsitory } from "../database/mongo/repository/schedule.repository";
import { ScheduleAttrs } from "../database/mongo/models/schedule.model";
import { BadRequestError } from "@prnv404/bus3";

describe("ScheduleService", () => {
	let scheduleService: ScheduleService;
	let scheduleRepository: ScheduleRepsitory;

	beforeEach(() => {
		// Mocking the ScheduleRepository
		scheduleRepository = {
			findByName: jest.fn(),
			Create: jest.fn(),
			findById: jest.fn(),
			findbyDepotCode: jest.fn(),
			deleteById: jest.fn()
		};

		scheduleService = new ScheduleService(scheduleRepository);
	});

	describe("Create", () => {
		it("should create a new schedule if it does not already exist", async () => {
			const data: ScheduleAttrs = {
				name: "Schedule 1",
				BusNo: "Bus123",
				start: "9:00 AM",
				stop: "10:00 AM",
				route: "Route 1",
				depotCode: "Depot123",
				Operator: "Operator 1"
			};

			scheduleRepository.findByName = jest.fn().mockResolvedValueOnce(null);
			scheduleRepository.Create = jest.fn().mockResolvedValueOnce(data);

			const result = await scheduleService.Create(data);

			expect(scheduleRepository.findByName).toHaveBeenCalledWith(data.name);
			expect(scheduleRepository.Create).toHaveBeenCalledWith(data);
			expect(result).toEqual(data);
		});

		it("should throw an error if the schedule already exists", async () => {
			const data: ScheduleAttrs = {
				name: "Schedule 1",
				BusNo: "Bus123",
				start: "9:00 AM",
				stop: "10:00 AM",
				route: "Route 1",
				depotCode: "Depot123",
				Operator: "Operator 1"
			};

			scheduleRepository.findByName = jest.fn().mockResolvedValueOnce(data);

			await expect(scheduleService.Create(data)).rejects.toThrow("Schedule Already Exist");
			expect(scheduleRepository.findByName).toHaveBeenCalledWith(data.name);
			expect(scheduleRepository.Create).not.toHaveBeenCalled();
		});
	});

	describe("findById", () => {
		it("should return the schedule when found", async () => {
			const id = "scheduleId";
			const schedule: ScheduleAttrs = {
				name: "Schedule 1",
				BusNo: "Bus123",
				start: "9:00 AM",
				stop: "10:00 AM",
				route: "Route 1",
				depotCode: "Depot123",
				Operator: "Operator 1"
			};

			scheduleRepository.findById = jest.fn().mockResolvedValueOnce(schedule);

			const result = await scheduleService.findById(id);

			expect(scheduleRepository.findById).toHaveBeenCalledWith(id);
			expect(result).toEqual(schedule);
		});

		it("should throw an error if no schedule is found", async () => {
			const id = "scheduleId";

			scheduleRepository.findById = jest.fn().mockResolvedValueOnce(null);

			await expect(scheduleService.findById(id)).rejects.toThrow("No Schedule Found");
			expect(scheduleRepository.findById).toHaveBeenCalledWith(id);
		});
	});

	describe("findByname", () => {
		it("should return the schedule when found", async () => {
			const name = "Schedule 1";
			const schedule: ScheduleAttrs = {
				name: "Schedule 1",
				BusNo: "Bus123",
				start: "9:00 AM",
				stop: "10:00 AM",
				route: "Route 1",
				depotCode: "Depot123",
				Operator: "Operator 1"
			};

			scheduleRepository.findByName = jest.fn().mockResolvedValueOnce(schedule);

			const result = await scheduleService.findByname(name);

			expect(scheduleRepository.findByName).toHaveBeenCalledWith(name);
			expect(result).toEqual(schedule);
		});

		it("should throw an error if no schedule is found", async () => {
			const name = "Nonexistent Schedule";

			scheduleRepository.findByName = jest.fn().mockResolvedValueOnce(null);

			await expect(scheduleService.findByname(name)).rejects.toThrow("No Schedule Found");
			expect(scheduleRepository.findByName).toHaveBeenCalledWith(name);
		});
	});

	describe("EditSchedule", () => {
		it("should update the schedule with the provided data", async () => {
			const id = "scheduleId";
			const data: ScheduleAttrs = {
				name: "Updated Schedule",
				BusNo: "Bus456",
				start: "10:00 AM",
				stop: "11:00 AM",
				route: "Route 2",
				depotCode: "Depot456",
				Operator: "Operator 2"
			};
			const existingSchedule = {
				name: "Schedule 1",
				BusNo: "Bus123",
				start: "9:00 AM",
				stop: "10:00 AM",
				route: "Route 1",
				depotCode: "Depot123",
				Operator: "Operator 1",
				save: jest.fn().mockResolvedValue(null)
			};

			const updatedSchedule = {
				name: "Updated Schedule",
				BusNo: "Bus456",
				start: "10:00 AM",
				stop: "11:00 AM",
				route: "Route 2",
				depotCode: "Depot456",
				Operator: "Operator 1", // Operator should not change
				save: jest.fn().mockResolvedValue(null)
			};

			scheduleRepository.findById = jest.fn().mockResolvedValueOnce(existingSchedule);

			const result = await scheduleService.EditSchedule(id, data);

			expect(scheduleRepository.findById).toHaveBeenCalledWith(id);

			expect(result.name).toEqual(data.name);
			expect(result.BusNo).toEqual(data.BusNo);
			expect(result.start).toEqual(data.start);
			expect(result.stop).toEqual(data.stop);
			expect(result.route).toEqual(data.route);
			expect(result.depotCode).toEqual(data.depotCode);
			expect(result.Operator).toEqual(existingSchedule.Operator); // Operator should not change
		});

		it("should throw an error if no schedule is found", async () => {
			const id = "nonexistentId";
			const data: ScheduleAttrs = {
				name: "Updated Schedule",
				BusNo: "Bus456",
				start: "10:00 AM",
				stop: "11:00 AM",
				route: "Route 2",
				depotCode: "Depot456",
				Operator: "Operator 2"
			};

			scheduleRepository.findById = jest.fn().mockResolvedValueOnce(null);

			await expect(scheduleService.EditSchedule(id, data)).rejects.toThrow(BadRequestError);
			expect(scheduleRepository.findById).toHaveBeenCalledWith(id);
		});
	});

	// Add more test cases for other methods

	// Create, findById, findByDepotCode, EditSchedule, DeleteSchedule
});

// Add more test cases for other methods

// Create, findByname, findByDepotCode, EditSchedule, DeleteSchedule
// findById, findByname, findByDepotCode, EditSchedule, DeleteSchedule
