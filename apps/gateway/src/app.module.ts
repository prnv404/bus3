import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller";
import { UsersModule } from "./users/users.module";
import { PassportModule } from "@nestjs/passport";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./core/gurds";
import { JwtStrategy } from "./core/passport";

@Module({
	imports: [UsersModule, PassportModule],
	controllers: [HealthController],
	providers: [
		JwtStrategy,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		}
	]
})
export class AppModule {}
