import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { BusPassModule } from './bus-pass/bus-pass.module';

@Module({
	imports: [DatabaseModule, AuthModule, BusPassModule],
	controllers: [],
	providers: []
})
export class UsersModule {}
