import mqtt from "mqtt";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class MQTTService {
	private client: mqtt.Client | null = null;

	constructor() {}

	public connect(brokerUrl: string, port?: number, protocol?: "wss" | "ws" | "mqtt" | "mqtts" | "tcp"): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (!this.client) {
				this.client = mqtt.connect({ host: brokerUrl, port, protocol });

				this.client.on("connect", () => {
					console.log("Connected to MQTT broker");
					resolve();
				});

				this.client.on("error", (error) => {
					console.error("MQTT error:", error.message);
					reject(error);
				});
			} else {
				resolve();
			}
		});
	}

	public async onMessage(cb: (topic: string, data: object) => void) {
		if (this.client) {
			this.client.on("message", (topic, message) => {
				const jsonString = Buffer.from(message).toString();
				const dataObject = JSON.parse(jsonString);
				cb(topic, dataObject);
			});
		} else {
			console.error("Not connected to MQTT broker");
		}
	}

	public disconnect(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (this.client) {
				this.client.end(false, () => {
					this.client = null;
					console.log("Disconnected from MQTT broker");
					resolve();
				});
			} else {
				reject(new Error("Not connected to MQTT broker"));
			}
		});
	}

	public subscribe(topic: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (this.client) {
				this.client.subscribe(topic, (err) => {
					if (err) {
						console.error("MQTT subscription error:", err.message);
						reject(err);
					} else {
						console.log(`Subscribed to topic: ${topic}`);
						resolve();
					}
				});
			} else {
				reject(new Error("Not connected to MQTT broker"));
			}
		});
	}

	public unsubscribe(topic: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (this.client) {
				this.client.unsubscribe(topic, (err: any) => {
					if (err) {
						console.error("MQTT unsubscription error:", err.message);
						reject(err);
					} else {
						console.log(`Unsubscribed from topic: ${topic}`);
						resolve();
					}
				});
			} else {
				reject(new Error("Not connected to MQTT broker"));
			}
		});
	}

	public publish(topic: string, message: any): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (this.client) {
				this.client.publish(topic, JSON.stringify(message), (err: any) => {
					if (err) {
						console.error("MQTT publish error:", err.message);
						reject(err);
					} else {
						// console.log(`Published to topic: ${topic}, message: ${message}`);
						resolve();
					}
				});
			} else {
				reject(new Error("Not connected to MQTT broker"));
			}
		});
	}
}
