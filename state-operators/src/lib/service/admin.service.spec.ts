import { AdminService } from "./admin.service";
import { AdminRepository } from "../database/mongo/repository/admin.repository";
import { BadRequestError } from "@prnv404/bus3";
import { Password } from "@prnv404/bus3";

describe("AdminService", () => {
	let adminService: AdminService;
	let adminRepository: AdminRepository;

	beforeEach(() => {
		adminRepository = new AdminRepository();
		adminService = new AdminService(adminRepository);
	});

	describe("signup", () => {
		it("should create a new admin if the admin does not exist", async () => {
			const mockData = {
				name: "John Doe",
				role: "Admin",
				phone: 1234567890,
				password: "password",
				Operator: "Test Operator"
			};

			adminRepository.findByPhone = jest.fn().mockResolvedValue(null);
			adminRepository.create = jest.fn().mockResolvedValue(mockData);

			const result = await adminService.signup(mockData);

			expect(adminRepository.findByPhone).toHaveBeenCalledWith(mockData.phone);
			expect(adminRepository.create).toHaveBeenCalledWith(mockData);
			expect(result).toEqual(mockData);
		});

		it("should throw BadRequestError if the admin already exists and is verified", async () => {
			const mockData = {
				name: "John Doe",
				role: "Admin",
				phone: 1234567890,
				password: "password",
				Operator: "Test Operator"
			};

			const existingAdmin = {
				...mockData,
				isVerified: true
			};

			adminRepository.findByPhone = jest.fn().mockResolvedValue(existingAdmin);

			await expect(adminService.signup(mockData)).rejects.toThrowError(BadRequestError);
			expect(adminRepository.findByPhone).toHaveBeenCalledWith(mockData.phone);
		});
	});

	describe("signin", () => {
		it("should return the admin if the admin with the provided phone number exists and the password is correct", async () => {
			const mockPhone = 1234567890;
			const mockPassword = "password";
			const mockAdmin = {
				name: "John Doe",
				role: "Admin",
				phone: mockPhone,
				password: await Password.toHash(mockPassword), // Hash the password for comparison
				Operator: "Test Operator"
			};

			adminRepository.findByPhone = jest.fn().mockResolvedValue(mockAdmin);
			Password.compare = jest.fn().mockResolvedValue(true);

			const result = await adminService.signin(mockPhone, mockPassword);

			expect(adminRepository.findByPhone).toHaveBeenCalledWith(mockPhone);
			expect(Password.compare).toHaveBeenCalledWith(mockAdmin.password, mockPassword);
			expect(result).toEqual(mockAdmin);
		});

		it("should throw BadRequestError if the admin with the provided phone number does not exist", async () => {
			const mockPhone = 1234567890;

			adminRepository.findByPhone = jest.fn().mockResolvedValue(null);

			await expect(adminService.signin(mockPhone, "password")).rejects.toThrowError(BadRequestError);
			expect(adminRepository.findByPhone).toHaveBeenCalledWith(mockPhone);
		});

		it("should throw BadRequestError if the provided password is incorrect", async () => {
			const mockPhone = 1234567890;
			const mockAdmin = {
				name: "John Doe",
				role: "Admin",
				phone: mockPhone,
				password: await Password.toHash("password"), // Hashed password
				Operator: "Test Operator"
			};

			adminRepository.findByPhone = jest.fn().mockResolvedValue(mockAdmin);
			Password.compare = jest.fn().mockResolvedValue(false);

			await expect(adminService.signin(mockPhone, "wrongPassword")).rejects.toThrowError(BadRequestError);
			expect(adminRepository.findByPhone).toHaveBeenCalledWith(mockPhone);
			expect(Password.compare).toHaveBeenCalledWith(mockAdmin.password, "wrongPassword");
		});
	});

	describe("Profile", () => {
		it("should return the admin with the provided ID if it exists", async () => {
			const mockId = "1234567890";
			const mockAdmin = {
				_id: mockId,
				name: "John Doe",
				role: "Admin",
				phone: 1234567890,
				password: "password",
				Operator: "Test Operator"
			};

			adminRepository.findById = jest.fn().mockResolvedValue(mockAdmin);

			const result = await adminService.Profile(mockId);

			expect(adminRepository.findById).toHaveBeenCalledWith(mockId);
			expect(result).toEqual(mockAdmin);
		});

		it("should throw BadRequestError if the admin with the provided ID does not exist", async () => {
			const mockId = "1234567890";

			adminRepository.findById = jest.fn().mockResolvedValue(null);

			await expect(adminService.Profile(mockId)).rejects.toThrowError(BadRequestError);
			expect(adminRepository.findById).toHaveBeenCalledWith(mockId);
		});
	});

	describe("VerifyOtp", () => {
		it("should verify the OTP and update the admin if the provided OTP is correct", async () => {
			const mockOtp = 1234;
			const mockPhone = 1234567890;
			const mockAdmin = {
				name: "John Doe",
				role: "Admin",
				phone: mockPhone,
				password: "password",
				Operator: "Test Operator",
				otp: mockOtp,
				isVerified: false,
				save: jest.fn().mockResolvedValue(undefined)
			};

			adminRepository.findByPhone = jest.fn().mockResolvedValue(mockAdmin);

			const result = await adminService.VerifyOtp(mockOtp, mockPhone);

			expect(adminRepository.findByPhone).toHaveBeenCalledWith(mockPhone);
			expect(result.isVerified).toBe(true);
			expect(mockAdmin.save).toHaveBeenCalled();
			expect(result).toEqual(mockAdmin);
		});

		it("should throw BadRequestError if no user is found with the provided phone number", async () => {
			const mockOtp = 1234;
			const mockPhone = 1234567890;

			adminRepository.findByPhone = jest.fn().mockResolvedValue(null);

			await expect(adminService.VerifyOtp(mockOtp, mockPhone)).rejects.toThrowError(BadRequestError);
			expect(adminRepository.findByPhone).toHaveBeenCalledWith(mockPhone);
		});

		it("should throw BadRequestError if the provided OTP is incorrect", async () => {
			const mockOtp = 1234;
			const mockPhone = 1234567890;
			const mockAdmin = {
				name: "John Doe",
				role: "Admin",
				phone: mockPhone,
				password: "password",
				Operator: "Test Operator",
				otp: 5678,
				save: jest.fn().mockResolvedValue(undefined)
			};

			adminRepository.findByPhone = jest.fn().mockResolvedValue(mockAdmin);

			await expect(adminService.VerifyOtp(mockOtp, mockPhone)).rejects.toThrowError(BadRequestError);
			expect(adminRepository.findByPhone).toHaveBeenCalledWith(mockPhone);
			expect(mockAdmin.save).not.toHaveBeenCalled();
		});
	});
});
