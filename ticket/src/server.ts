import "reflect-metadata";
import { MQTTService } from "./lib/service/mqtt.service";
import { container } from "tsyringe";
import app from "./app";
import { connectToMongoDB } from "@prnv404/bus3";

const mqttService = container.resolve(MQTTService);

const start = async () => {
	await connectToMongoDB("mongodb://mongo-srv:27017/ticket");

	await mqttService.connect("mqtt://bus3-listeners:1883");

	await mqttService.subscribe("bus/srt/+/ticket");

	await mqttService.subscribe("bus/pvt/+/ticket");

	app.listen(3000, () => {
		console.log("Server is Listening on port 3000");
	})
		.on("error", async () => {
			await mqttService.disconnect();
		})
		.on("close", async () => {
			await mqttService.disconnect();
		});
};

start();
