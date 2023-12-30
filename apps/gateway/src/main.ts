import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {} from "@app/common";
import { AllGlobalExceptionsFilter } from "./core/exception/http.exception.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen(3000);
}
bootstrap();
