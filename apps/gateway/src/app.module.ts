import { Module } from "@nestjs/common";
import { CommuterModule } from "./commuter/commuter.module";

@Module({
	imports: [CommuterModule],
	controllers: [],
	providers: []
})
export class AppModule {}
