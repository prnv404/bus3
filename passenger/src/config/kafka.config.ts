import { Kafka } from "kafkajs";

export const kafka_client = new Kafka({ clientId: "passenger-service", brokers: ["bus3-kafka:9092"] });
