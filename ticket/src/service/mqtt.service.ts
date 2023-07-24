import mqtt from "mqtt";
import { MessageHandler, TicketInterface } from "./message.handler";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class MQTTService {
	private client: mqtt.Client | null = null;

	constructor(private readonly messageHanler: MessageHandler) {}

	public connect(brokerUrl: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (!this.client) {
				this.client = mqtt.connect(brokerUrl);

				this.client.on("connect", () => {
					console.log("Connected to MQTT broker");
					resolve();
				});

				this.client.on("error", (error) => {
					console.error("MQTT error:", error.message);
					reject(error);
				});
				this.client.on("message", async (topic, message) => {
					console.log(`Received message on topic: ${topic}, message: ${message.toString()}`);
					const data = JSON.parse(message.toString()) as TicketInterface;
					await this.messageHanler.handleMessage(data);
				});
			} else {
				resolve();
			}
		});
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

	public publish(topic: string, message: TicketInterface): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (this.client) {
				this.client.publish(topic, JSON.stringify(message), (err: any) => {
					if (err) {
						console.error("MQTT publish error:", err.message);
						reject(err);
					} else {
						console.log(`Published to topic: ${topic}, message: ${message}`);
						resolve();
					}
				});
			} else {
				reject(new Error("Not connected to MQTT broker"));
			}
		});
	}
}
