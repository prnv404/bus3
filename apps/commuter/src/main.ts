import { NestFactory } from "@nestjs/core";
import { CommuterModule } from "./commuter.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";
import { COMMUTER_PACKAGE_NAME } from "@app/common";

async function bootstrap() {
	const app = await NestFactory.create(CommuterModule);

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.GRPC,
		options: {
			protoPath: join(__dirname, "../commuter.proto"),
			package: COMMUTER_PACKAGE_NAME
		}
	});
	app.enableCors()
	await app.listen(5000);
}
bootstrap();
