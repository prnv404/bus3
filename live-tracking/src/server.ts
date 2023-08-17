import "reflect-metadata";
import { container } from "tsyringe";
import { MQTTService } from "./lib/mqtt.service";

const mqttService = container.resolve(MQTTService);
const hlsMqttService = container.resolve(MQTTService);

const start = async () => {
	const MQTT_BROKER = "mqtt.hsl.fi";
	const MQTT_PORT = 8883;
	const MQTT_TOPIC = "/hfp/v2/journey/+/vp/bus/#";

	await mqttService.connect("bus3-listeners");

	await mqttService.subscribe("/res/buspass/BUS10");

	setInterval(async () => {
		await mqttService.publish("/req/buspass/BUS10", {
			id: "64ddc167bf265f9b41cd86ac",
			price: 100,
			to: "kochi",
			from: "alappey",
			busNo: "BUS10",
			OperatorId: "64be18d982af82bedad661af",
			route: "ALP-AMB",
			srt: true
		});
	}, 100000);

	// await hlsMqttService.connect(MQTT_BROKER, MQTT_PORT, "mqtts");

	// // await hlsMqttService.subscribe(MQTT_TOPIC);

	// await hlsMqttService.onMessage(async (topic, data) => {
	// 	await mqttService.publish(topic, JSON.stringify(data));
	// });

	// await mqttService.subscribe("/hfp/v2/journey/+/vp/bus/#");

	await mqttService.onMessage((topic, data) => {
		console.log(`Message Received from ${topic} data ${data}`);
	});
};

start();
