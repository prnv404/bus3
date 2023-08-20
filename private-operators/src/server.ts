import "dotenv/config";
import "reflect-metadata";
import app from "./app";
import { connectToMongoDB } from "@prnv404/bus3";
import { TicketCreatedEventListener } from "./events/listener/ticket.listener";
import { kafka_client } from "./config/kafka.config";

(async () => {
	try {
		await connectToMongoDB("mongodb://mongo-srv:27017/pvt-operator");

		const ticketListener = new TicketCreatedEventListener(kafka_client);

		await ticketListener.listen();

		app.listen(3000, () => {
			console.log("Server is Running on port 3000");
		})
			.on("error", async () => {
				await ticketListener.disconnect();
			})
			.on("close", async () => {
				await ticketListener.disconnect();
			});
	} catch (error) {
		console.log(error);
	}
})();
