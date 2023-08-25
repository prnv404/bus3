import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";
import app from "./app";
import { connectToMongoDB } from "@prnv404/bus3";
import { MQTTService } from "./lib/service/mqtt.service";
import { Service } from "./lib/controller/buspass.controller";
import { ACTIVATE_PASS_LISTENER } from "./events/listener/card.activate.listeners";
import { kafka_client } from "./config/kafka.config";
import { ADD_BALANCE_LISTENERS } from "./events/listener/add.balance.listener";

(async () => {
	try {
		await connectToMongoDB("mongodb://mongo-srv:27017/buspass");

		const mqtt = new MQTTService();

		await mqtt.connect("bus3-listeners");

		await mqtt.subscribe("/req/buspass/#");

		await new ACTIVATE_PASS_LISTENER(kafka_client).listen();

		await new ADD_BALANCE_LISTENERS(kafka_client).listen();

		mqtt.onMessage(async (topic, data: any) => {
			const response = await Service.BusPassTransaction({ topic, ...data });
			await mqtt.publish(response?.topic!, response?.message);
		});

		app.listen(3000, () => {

			console.log("Server is Running on port 3000");
		})
			.on("error", async () => {})
			.on("close", async () => {});
	} catch (error) {
		console.log(error);
	}
})();
