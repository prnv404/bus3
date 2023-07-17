import { EmployeeService } from "./employee.service";
import { EmployeeRepository } from "../database/mongo/repository/employee.repository";
import { DepotRepository } from "../database/mongo/repository/depot.repository";
import { BadRequestError } from "@prnv404/bus3";

describe("EmployeeService", () => {
	let employeeService: EmployeeService;
	let employeeRepository: EmployeeRepository;
	let depotRepository: DepotRepository;

	beforeEach(() => {
		employeeRepository = new EmployeeRepository();
		depotRepository = new DepotRepository();
		employeeService = new EmployeeService(employeeRepository, depotRepository);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("createEmployee", () => {
		it("should create a new employee when data is valid", async () => {
			const data = {
				name: "John Doe",
				type: "Operator",
				Operator: "Some operator",
				depotCode: "DEP001",
				phone: 1234567890,
				save: jest.fn().mockResolvedValue(null)
			};
			employeeRepository.findEmployee = jest.fn().mockResolvedValue(null);
			employeeRepository.createEmployee = jest.fn().mockResolvedValue({ id: "1", ...data });
			depotRepository.findByDepotCode = jest
				.fn()
				.mockResolvedValue({ id: "1", employees: [], save: jest.fn().mockResolvedValue(null) });

			const result = await employeeService.createEmployee(data);

			expect(result).toEqual({ id: "1", ...data });
		});

		it("should throw BadRequestError when employee already exists", async () => {
			const data = {
				name: "John Doe",
				type: "Operator",
				Operator: "Some operator",
				depotCode: "DEP001",
				phone: 1234567890
			};
			employeeRepository.findEmployee = jest.fn().mockResolvedValue({ id: "1", ...data });

			await expect(employeeService.createEmployee(data)).rejects.toThrow(BadRequestError);
		});
	});

	describe("getEmployee", () => {
		it("should return the employee when ID exists", async () => {
			const employeeId = "1";
			const employee = { id: employeeId, name: "John Doe", type: "Operator", depotCode: "DEP001", phone: 1234567890 };
			employeeRepository.getEmployeeById = jest.fn().mockResolvedValue(employee);

			const result = await employeeService.getEmploye(employeeId);

			expect(result).toEqual(employee);
		});

		it("should throw BadRequestError when employee ID does not exist", async () => {
			const employeeId = "1";
			employeeRepository.getEmployeeById = jest.fn().mockResolvedValue(null);

			await expect(employeeService.getEmploye(employeeId)).rejects.toThrow(BadRequestError);
		});
	});

	describe("getAllEmployees", () => {
		it("should return all employees for a given depot code", async () => {
			const depotCode = "DEP001";
			const employees = [
				{ id: "1", name: "John Doe", type: "Operator", depotCode: depotCode, phone: 1234567890 },
				{ id: "2", name: "Jane Smith", type: "Supervisor", depotCode: depotCode, phone: 9876543210 }
			];
			employeeRepository.getAllEmployees = jest.fn().mockResolvedValue(employees);

			const result = await employeeService.getAllEmployees(depotCode);

			expect(result).toEqual(employees);
		});
	});

	describe("editEmployee", () => {
		it("should update employee data when ID exists", async () => {
			const employeeId = "1";

			const data = {
				name: "John Doe",
				type: "Operator",
				depotCode: "DEP001",
				phone: 1234567890,
				Operator: "Some operator"
			};
			const existingEmployee = {
				id: employeeId,
				name: "Old Name",
				type: "Old Type",
				depotCode: "Old Depot",
				phone: 9876543210,
				save: jest.fn().mockResolvedValue(null)
			};
			employeeRepository.getEmployeeById = jest.fn().mockResolvedValue(existingEmployee);

			const result = await employeeService.EditEmployee(data, employeeId);

			expect(existingEmployee.name).toEqual(data.name);
			expect(existingEmployee.type).toEqual(data.type);
			expect(existingEmployee.depotCode).toEqual(data.depotCode);
			expect(existingEmployee.phone).toEqual(data.phone);
			expect(result).toEqual(existingEmployee);
		});

		it("should throw BadRequestError when employee ID does not exist", async () => {
			const employeeId = "1";
			const data = { name: "John Doe", type: "Operator", depotCode: "DEP001", phone: 1234567890, Operator: "KSRTC" };
			employeeRepository.getEmployeeById = jest.fn().mockResolvedValue(null);

			await expect(employeeService.EditEmployee(data, employeeId)).rejects.toThrow(BadRequestError);
		});
	});

	describe("deleteEmployee", () => {
		it("should delete the employee when ID exists", async () => {
			const employeeId = "1";
			const employee = { id: employeeId, name: "John Doe", type: "Operator", depotCode: "DEP001", phone: 1234567890 };
			employeeRepository.deleteEmployee = jest.fn().mockResolvedValue(employee);

			const result = await employeeService.DeleteEmployee(employeeId);

			expect(result).toEqual(employee);
		});

		it("should throw BadRequestError when employee ID does not exist", async () => {
			const employeeId = "1";
			jest.spyOn(employeeRepository, "deleteEmployee").mockResolvedValue(null);

			await expect(employeeService.DeleteEmployee(employeeId)).rejects.toThrow(BadRequestError);
		});
	});
});
