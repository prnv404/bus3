import { BadRequestError } from "@prnv404/bus3";
import { DepotService } from "./depot.service";
import { DepotRepository } from "../database/mongo/repository/depot.repository";
import { DepotAttrs } from "../database/mongo/models/depot.model";

describe("DepotService", () => {
	let depotService: DepotService;
	let depotRepository: DepotRepository;

	beforeEach(() => {
		depotRepository = new DepotRepository();
		depotService = new DepotService(depotRepository);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("createDepots", () => {
		it("should create a depot if it does not already exist", async () => {
			// Arrange
			const data: DepotAttrs = {
				name: "Depot 1",
				depotCode: "ABC123",
				district: "District 1",
				Operator: "Operator 1"
			};
			depotRepository.findDepotByName = jest.fn().mockResolvedValue(null);
			depotRepository.findByDepotCode = jest.fn().mockResolvedValue(null);
			depotRepository.create = jest.fn().mockResolvedValue(data);

			// Act
			const result = await depotService.createDepots(data);

			// Assert
			expect(depotRepository.findDepotByName).toHaveBeenCalledWith(data.name);
			expect(depotRepository.findByDepotCode).toHaveBeenCalledWith(data.depotCode);
			expect(depotRepository.create).toHaveBeenCalledWith(data);
			expect(result).toEqual(data);
		});

		it("should throw BadRequestError if depot with the same depotCode already exists", async () => {
			// Arrange
			const data: DepotAttrs = {
				name: "Depot 1",
				depotCode: "ABC123",
				district: "District 1",
				Operator: "Operator 1"
			};
			depotRepository.findDepotByName = jest.fn().mockResolvedValue(null);
			depotRepository.findByDepotCode = jest.fn().mockResolvedValue(data);

			// Act and Assert
			await expect(depotService.createDepots(data)).rejects.toThrowError(BadRequestError);
			expect(depotRepository.findByDepotCode).toHaveBeenCalledWith(data.depotCode);
		});
	});

	describe("GetDepot", () => {
		it("should return the depot if it exists", async () => {
			// Arrange
			const depotId = "123";
			const depot = { id: depotId, name: "Depot 1" };
			depotRepository.findById = jest.fn().mockResolvedValue(depot);

			// Act
			const result = await depotService.GetDepot(depotId);

			// Assert
			expect(depotRepository.findById).toHaveBeenCalledWith(depotId);
			expect(result).toEqual(depot);
		});

		it("should throw BadRequestError if depot does not exist", async () => {
			// Arrange
			const depotId = "123";
			depotRepository.findById = jest.fn().mockResolvedValue(null);

			// Act and Assert
			await expect(depotService.GetDepot(depotId)).rejects.toThrowError(BadRequestError);
			expect(depotRepository.findById).toHaveBeenCalledWith(depotId);
		});
	});

	describe("GetAllDepots", () => {
		it("should return all depots", async () => {
			// Arrange
			const depots = [
				{ id: "1", name: "Depot 1" },
				{ id: "2", name: "Depot 2" }
			];
			depotRepository.findAllDepot = jest.fn().mockResolvedValue(depots);

			// Act
			const result = await depotService.GetAllDepots();

			// Assert
			expect(depotRepository.findAllDepot).toHaveBeenCalled();
			expect(result).toEqual(depots);
		});
	});

	describe("EditDepot", () => {
		it("should update the depot if it exists", async () => {
			// Arrange
			const depotId = "123";
			const existingDepot = {
				id: depotId,
				name: "Depot 1",
				district: "District 1",
				depotCode: "ABC123",
				Operator: "KSRTC",
				save: jest.fn().mockResolvedValue(null)
			};
			const updatedDepotData = {
				id: depotId,
				name: "Updated Depot 1",
				district: "Updated District 1",
				depotCode: "ALP04",
				Operator: "KSRTC"
			};
			depotRepository.findById = jest.fn().mockResolvedValue(existingDepot);

			// Act
			const result = await depotService.EditDepot(depotId, updatedDepotData);

			// Assert
			expect(depotRepository.findById).toHaveBeenCalledWith(depotId);
			expect(existingDepot.name).toEqual(updatedDepotData.name);
			expect(existingDepot.district).toEqual(updatedDepotData.district);
			expect(existingDepot.depotCode).toEqual(existingDepot.depotCode);
			expect(result).toEqual({ ...updatedDepotData, save: existingDepot.save });
		});

		it("should throw BadRequestError if depot does not exist", async () => {
			// Arrange
			const depotId = "123";
			const updatedDepotData: DepotAttrs = {
				name: "Updated Depot 1",
				district: "Updated District 1",
				depotCode: "",
				Operator: ""
			};
			depotRepository.findById = jest.fn().mockResolvedValue(null);

			// Act and Assert
			await expect(depotService.EditDepot(depotId, updatedDepotData)).rejects.toThrowError(BadRequestError);
			expect(depotRepository.findById).toHaveBeenCalledWith(depotId);
		});
	});

	describe("DeleteDepot", () => {
		it("should delete the depot if it exists", async () => {
			// Arrange
			const depotId = "123";
			const existingDepot = { id: depotId, name: "Depot 1" };
			depotRepository.findById = jest.fn().mockResolvedValue(existingDepot);
			depotRepository.deleteDepot = jest.fn().mockResolvedValue(true);

			// Act
			const result = await depotService.DeleteDepot(depotId);

			// Assert
			expect(depotRepository.findById).toHaveBeenCalledWith(depotId);
			expect(depotRepository.deleteDepot).toHaveBeenCalledWith(depotId);
			expect(result).toBe(true);
		});

		it("should throw BadRequestError if depot does not exist", async () => {
			// Arrange
			const depotId = "123";
			depotRepository.findById = jest.fn().mockResolvedValue(null);

			// Act and Assert
			await expect(depotService.DeleteDepot(depotId)).rejects.toThrowError(BadRequestError);
			expect(depotRepository.findById).toHaveBeenCalledWith(depotId);
		});
	});
});
