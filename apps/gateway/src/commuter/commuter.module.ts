import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { COMMUTER_PACKAGE_NAME, COMMUTER_SERVICE_NAME } from "@app/common";
import { join } from "path";
import { AuthModule } from './auth/auth.module';

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
		]),
		AuthModule
	],
	controllers: [],
	providers: []
})
export class CommuterModule {}
