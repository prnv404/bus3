import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";
import app from "./app";
import { connectToMongoDB } from "@prnv404/bus3";
import { MQTTService } from "./lib/service/mqtt.service";
import { Service } from "./lib/controller/buspass.controller";

(async () => {
	try {
		await connectToMongoDB("mongodb://mongo-srv:27017/buspass");

		const mqtt = new MQTTService();

		await mqtt.connect("bus3-listeners");

		await mqtt.subscribe("/req/buspass/#");

		mqtt.onMessage(async (topic, data: any) => {
			const response = await Service.BusPassTransaction(data.id, data.price, topic);
			await mqtt.publish(response?.topic!, response?.message);
		});

		app.listen(3000, () => {
			console.log("Server is Listening on port 3000");
		})
			.on("error", async () => {})
			.on("close", async () => {});
	} catch (error) {
		console.log(error);
	}
})();
