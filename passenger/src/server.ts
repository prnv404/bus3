import "dotenv/config";
import "reflect-metadata";
import app from "./app";
import { connectToMongoDB } from "@prnv404/bus3";
import { BusPassCreatedEventListener } from "./events/listener/buspass.created.listner";
import { kafka_client } from "./config/kafka.config";
import { TicketCreatedEventListiner } from "./events/listener/ticket.created.buspass.listener";

(async () => {
	try {
		await connectToMongoDB("mongodb://mongo-srv:27017/passenger");
		await new BusPassCreatedEventListener(kafka_client).listen();
		await new TicketCreatedEventListiner(kafka_client).listen();
		app.listen(3000, () => {
			console.log("Server is Running on port 3000");
		})
			.on("error", async () => {})
			.on("close", async () => {});
	} catch (error) {
		console.log(error);
	}
})();
