import { Kafka } from "kafkajs";

export const kafka_client = new Kafka({ clientId: "notification-service", brokers: ["bus3-kafka:9092"] });
