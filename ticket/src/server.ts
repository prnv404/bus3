import "reflect-metadata";
import { MQTTService } from "./service/mqtt.service";
import { container } from "tsyringe";

const mqttService = container.resolve(MQTTService);

const start = async () => {
	await mqttService.connect("mqtt://bus3-listeners:1883");

	await mqttService.subscribe("bus/srt/+/ticket");

	await mqttService.subscribe("bus/pvt/+/ticket");

	// setInterval(async () => {
	// 	await mqttService.publish("bus/pvt/64be144ccbaa5636dc8b2824/ticket", {
	// 		busNo: "BUS10",
	// 		from: "ALAPPUZHA",
	// 		to: "AMBALAPPUZHA",
	// 		OperatorId: "64be144ccbaa5636dc8b2824",
	// 		price: 15,
	// 		route: "ALP-AMB",
	// 		srt: false
	// 	});
	// }, 5000);
};

start();
