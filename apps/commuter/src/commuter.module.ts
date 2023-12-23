import { Module } from "@nestjs/common";
import { DatabaseModule } from "./db/database.module";
import { AuthModule } from "./auth/auth.module";
import { BussPassModule } from "./buss-pass/buss-pass.module";

@Module({
	imports: [DatabaseModule, AuthModule, BussPassModule],
	controllers: [],
	providers: []
})
export class CommuterModule {}
