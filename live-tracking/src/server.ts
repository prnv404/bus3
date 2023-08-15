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

	await mqttService.subscribe("/res/buspass/bus1");

	// setInterval(async () => {
	// 	await mqttService.publish("/req/buspass/bus1", {
	// 		id: "64d9fbadfe8d512a2ea6b7b6",
	// 		price: 60
	// 	});
	// }, 2000);

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
