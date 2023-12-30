import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { BusPassModule } from './bus-pass/bus-pass.module';

@Module({
	imports: [AuthModule, BusPassModule]
})
export class UsersModule {}
