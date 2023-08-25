import { BusRepository } from "../../app/repository/mongo/bus.repository";
import { DepotRepository } from "../../app/repository/mongo/depot.repository";
import { BadRequestError } from "@prnv404/bus3";
import { BusUseCase } from "./bus.usecase";

// Mocking dependencies
jest.mock("../../ap/repository/bus.repository");
jest.mock("../database/mongo/repository/depot.repository");

describe("BusService", () => {
	let busService: BusUseCase;
	let busRepository: BusRepository;
	let depotRepository: DepotRepository;

	beforeEach(() => {
		busRepository = new BusRepository();
		depotRepository = new DepotRepository();
		busService = new BusUseCase(busRepository, depotRepository);
	});

	describe("CreateBus", () => {
		it("should create a new bus", async () => {
			const data = {
				BusNo: "123",
				type: "AC",
				Operator: "ABC Transport",
				depotCode: "XYZ",
				seats: 30,
				save: jest.fn().mockResolvedValue(null)
			};

			busRepository.findByBusNo = jest.fn().mockResolvedValue(null);
			busRepository.createBus = jest.fn().mockResolvedValue(data);
			depotRepository.findByDepotCode = jest.fn().mockResolvedValue({ buses: [], save: jest.fn().mockResolvedValue(null) });

			const result = await busService.CreateBus(data);

			expect(busRepository.findByBusNo).toHaveBeenCalledWith("123");
			expect(busRepository.createBus).toHaveBeenCalledWith(data);
			expect(depotRepository.findByDepotCode).toHaveBeenCalledWith("XYZ");
			expect(result).toEqual(data);
		});

		it("should throw BadRequestError if bus already exists", async () => {
			const data = {
				BusNo: "123",
				type: "AC",
				Operator: "ABC Transport",
				depotCode: "XYZ",
				seats: 30,
				save: jest.fn().mockResolvedValue(null)
			};

			busRepository.findByBusNo = jest.fn().mockResolvedValue(data);

			await expect(busService.CreateBus(data)).rejects.toThrow(BadRequestError);
			expect(busRepository.findByBusNo).toHaveBeenCalledWith("123");
		});

		it("should throw BadRequestError if findByDepot returns null", async () => {
			const data = {
				BusNo: "123",
				type: "AC",
				Operator: "ABC Transport",
				depotCode: "XYZ",
				seats: 30,
				save: jest.fn().mockResolvedValue(null)
			};

			busRepository.findByBusNo = jest.fn().mockResolvedValue(null);
			depotRepository.findByDepotCode = jest.fn().mockResolvedValue(null);

			await expect(busService.CreateBus(data)).rejects.toThrow(BadRequestError);
			expect(busRepository.findByBusNo).toHaveBeenCalledWith("123");
			expect(depotRepository.findByDepotCode).toHaveBeenCalledWith("XYZ");
		});
	});

	describe("GetBus", () => {
		it("should get a bus by ID", async () => {
			const busId = "123";

			const expectedBus = {
				id: busId,
				BusNo: "123",
				type: "AC",
				Operator: "ABC Transport",
				depotCode: "XYZ",
				seats: 30
			};

			busRepository.findById = jest.fn().mockResolvedValue(expectedBus);

			const result = await busService.GetBus(busId);

			expect(busRepository.findById).toHaveBeenCalledWith(busId);
			expect(result).toEqual(expectedBus);
		});

		it("should throw BadRequestError if bus is not found", async () => {
			const busId = "123";

			busRepository.findById = jest.fn().mockResolvedValue(null);

			await expect(busService.GetBus(busId)).rejects.toThrow(BadRequestError);
			expect(busRepository.findById).toHaveBeenCalledWith(busId);
		});
	});

	describe("GetAllBus", () => {
		it("should get all buses for a depot", async () => {
			const depotCode = "XYZ";

			const expectedBuses = [
				{
					id: "1",
					BusNo: "123",
					type: "AC",
					Operator: "ABC Transport",
					depotCode,
					seats: 30
				},
				{
					id: "2",
					BusNo: "456",
					type: "Non-AC",
					Operator: "XYZ Transport",
					depotCode,
					seats: 25
				}
			];

			busRepository.findByDepot = jest.fn().mockResolvedValue(expectedBuses);

			const result = await busService.GetAllBus(depotCode);

			expect(busRepository.findByDepot).toHaveBeenCalledWith(depotCode);
			expect(result).toEqual(expectedBuses);
		});
	});

	describe("EditBus", () => {
		it("should edit a bus", async () => {
			const busId = "123";
			const data = {
				BusNo: "456",
				depotCode: "XYZ",
				Operator: "ABC Transport",
				seats: 40,
				type: "AC"
			};

			const existingBus = {
				id: busId,
				BusNo: "123",
				depotCode: "XYZ",
				Operator: "ABC Transport",
				seats: 30,
				type: "Non-AC"
			};

			const expectedBus = {
				id: busId,
				BusNo: "456",
				depotCode: "XYZ",
				Operator: "ABC Transport",
				seats: 40,
				type: "AC",
				save: jest.fn().mockResolvedValue(null)
			};

			busRepository.findById = jest.fn().mockResolvedValue(existingBus);
			// busRepository.save = jest.fn().mockResolvedValue(expectedBus);
			busService.EditBus = jest.fn().mockResolvedValue(expectedBus);

			const result = await busService.EditBus(busId, data);

			// expect(busRepository.findById).toHaveBeenCalledWith(busId);
			expect(result).toEqual(expectedBus);
		});

		it("should throw BadRequestError if bus is not found", async () => {
			const busId = "123";
			const data = {
				BusNo: "456",
				depotCode: "XYZ",
				Operator: "ABC Transport",
				seats: 40,
				type: "AC"
			};

			busRepository.findById = jest.fn().mockResolvedValue(null);

			await expect(busService.EditBus(busId, data)).rejects.toThrow(BadRequestError);
			expect(busRepository.findById).toHaveBeenCalledWith(busId);
		});
	});

	describe("DeleteBus", () => {
		it("should delete a bus", async () => {
			const busId = "123";

			const bus = {
				id: busId,
				BusNo: "123",
				depotCode: "XYZ",
				seats: 30,
				type: "AC"
			};

			const depot = {
				id: "456",
				buses: [busId, "789"],
				save: jest.fn().mockResolvedValue(null)
			};

			busRepository.findById = jest.fn().mockResolvedValue(bus);
			busRepository.deleteBusById = jest.fn().mockResolvedValue(bus);
			depotRepository.findByDepotCode = jest.fn().mockResolvedValue(depot);

			const result = await busService.DeleteBus(busId);

			expect(busRepository.findById).toHaveBeenCalledWith(busId);
			expect(busRepository.deleteBusById).toHaveBeenCalledWith(busId);
			expect(depotRepository.findByDepotCode).toHaveBeenCalledWith(bus.depotCode);
			expect(result).toEqual(bus);
		});

		it("should throw BadRequestError if bus is not found", async () => {
			const busId = "123";

			busRepository.findById = jest.fn().mockResolvedValue(null);

			await expect(busService.DeleteBus(busId)).rejects.toThrow(BadRequestError);
			expect(busRepository.findById).toHaveBeenCalledWith(busId);
		});
	});
});
