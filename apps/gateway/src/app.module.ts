import { Module } from "@nestjs/common";
import { CommuterModule } from "./commuter/commuter.module";
import { OperatorModule } from "./operator/operator.module";
import { PaymentModule } from "./payment/payment.module";
import { BookingModule } from "./booking/booking.module";
import { DiscoModule } from "./disco/disco.module";

@Module({
	imports: [CommuterModule, OperatorModule, PaymentModule, BookingModule, DiscoModule],
	controllers: [],
	providers: []
})
export class AppModule {}
