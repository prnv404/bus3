import { Kafka } from "kafkajs";

export const kafka_client = new Kafka({ clientId: "state-operator-service", brokers: ["bus3-kafka:9092"] });
