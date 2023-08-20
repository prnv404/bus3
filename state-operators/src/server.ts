import "dotenv/config";
import "express-async-errors";
import "reflect-metadata";
import app from "./app";
import { connectToMongoDB } from "@prnv404/bus3";
import { PingElasticSearch } from "./config/elasticsearch.config";
import { TicketListener } from "./events/listener/ticket.created.listener";
import { kafka_client } from "./config/kafka.config";

(async () => {
	try {
		await connectToMongoDB("mongodb://mongo-srv:27017/srt");

		await PingElasticSearch();

		const ticketListener = new TicketListener(kafka_client);

		await ticketListener.listen();

		app.listen(3000, () => {
			console.log("Server is running on port 3000");
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
