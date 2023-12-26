import { Module } from "@nestjs/common";
import { CommuterService } from "./commuter.service";
import { CommuterController } from "./commuter.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { COMMUTER_PACKAGE_NAME, COMMUTER_SERVICE_NAME } from "@app/common";
import { join } from "path";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: COMMUTER_SERVICE_NAME,
				transport: Transport.GRPC,
				options: {
					package: COMMUTER_PACKAGE_NAME,
					protoPath: join(__dirname, "../commuter.proto")
				}
			}
		])
	],
	controllers: [CommuterController],
	providers: [CommuterService]
})
export class CommuterModule {}
