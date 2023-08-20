import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";
import app from "./app";
import { connectToMongoDB } from "@prnv404/bus3";
import { BusPassOrderCreatedEvent } from "./event/listeners/pass.order.created.listener";
import { kafka_client } from "./config/kafka.config";

(async () => {
	try {
		await connectToMongoDB("mongodb://mongo-srv:27017/order");
		await new BusPassOrderCreatedEvent(kafka_client).listen();
		app.listen(3000, () => {
			console.log("Server is Running on port 3000");
		})
			.on("error", async () => {})
			.on("close", async () => {});
	} catch (error) {
		console.log(error);
	}
})();
