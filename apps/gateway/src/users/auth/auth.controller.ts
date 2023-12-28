import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { createUserDto } from "@app/common";

@Controller("users/auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post()
	create(@Body() createAuthDto: createUserDto) {
		return this.authService.create(createAuthDto);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.authService.findOne(id);
	}

	@Post("/verify-otp")
	verifyOtp(@Query("otp") otp: string) {
		return this.authService.verifyOTP(otp);
	}
	
}
