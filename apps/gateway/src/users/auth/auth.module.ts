import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { USER_AUTH_SERVICE_NAME, USERS_PACKAGE_NAME } from "@app/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: USER_AUTH_SERVICE_NAME,
				transport: Transport.GRPC,
				options: {
					package: USERS_PACKAGE_NAME,
					protoPath: join(__dirname, "../users.proto")
				}
			}
		])
	],
	controllers: [AuthController],
	providers: [AuthService],
	exports: []
})
export class AuthModule {}
