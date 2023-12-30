import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseFilters, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { createUserDto } from "@app/common";
import { Public } from "../../core/decorator";
import { AllGlobalExceptionsFilter } from "../../core/exception/http.exception.filter";

@UseFilters(AllGlobalExceptionsFilter)
@Controller("users/auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post()
	create(@Body() createAuthDto: createUserDto) {
		return this.authService.create(createAuthDto);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.authService.findOne(id);
	}

	@Post("/verify-otp")
	verifyOtp(@Query("otp") otp: string, @Request() req) {
		const userId = req.userId;
		return this.authService.verifyOTP(userId, otp);
	}
}
