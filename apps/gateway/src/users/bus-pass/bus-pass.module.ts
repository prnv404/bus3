import { Module } from "@nestjs/common";
import { BusPassService } from "./bus-pass.service";
import { BusPassController } from "./bus-pass.controller";
import { BUS_PASS_SERVICE_NAME, USERS_PACKAGE_NAME } from "@app/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: BUS_PASS_SERVICE_NAME,
				transport: Transport.GRPC,
				options: {
					package: USERS_PACKAGE_NAME,
					protoPath: join(__dirname, "../users.proto")
				}
			}
		])
	],
	controllers: [BusPassController],
	providers: [BusPassService]
})
export class BusPassModule {}
