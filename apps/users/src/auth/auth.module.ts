import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET } from "@app/config";

@Module({
	imports: [JwtModule.register({ secret: JWT_SECRET, signOptions: { expiresIn: "5m" } })],
	controllers: [AuthController],
	providers: [AuthService]
})
export class AuthModule {}
