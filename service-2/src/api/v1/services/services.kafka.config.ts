import { KAFKA_URL } from "src/env";
import { Kafka } from "kafkajs";

const clientId = "Auth";
const brokers = [KAFKA_URL as string];
const kafka = new Kafka({ clientId, brokers });

export default kafka;
