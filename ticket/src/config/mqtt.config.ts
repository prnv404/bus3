import mqtt from "mqtt";

export const mqttClient = mqtt.connect("mqtt://bus3-listeners:1883", {
	clientId: "ticket",
	clean: true,
	username: "admin",
	password: "public"
});
