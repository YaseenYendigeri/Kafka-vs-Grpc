import {
  logPerformanceMetrics,
  logNetworkLatency,
} from "src/helpers/performanceMetrics";
import { getConsumer } from "./services.kafkaOperations";
import locationSchema from "src/models/models.location";

export const testConsumer = async (app: any) => {
  try {
    let consumerData = await getConsumer("seed"); // your topic name
    console.log("8 -----------------", consumerData);

    if (!consumerData.success) {
      console.log("error---------", consumerData.err);
      throw new Error("connection error");
    }

    let consumer: any = consumerData.data;
    await consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat }: any) => {
        const startTime = process.hrtime(); // High-resolution start time for network latency
        const processingStartTime = Date.now(); // Start time for processing time

        try {
          console.log("Received message", {
            topic,
            partition,
            key: message.key ? message.key.toString() : "",
            value: message.value ? message.value.toString() : "",
          });

          let dataString = message.value ? message.value.toString() : "";
          let key = message.key ? message.key.toString() : "";

          let data = JSON.parse(dataString);
          let tripId = data?.tripId;
          let coords = data?.coordinates;

          let allLocationData = await locationSchema
            .find({ tripId })
            .sort({ step: -1 });
          let locationData: any = allLocationData[0];

          let coordinates = coords.map((loc: any) => [loc.lat, loc.lng]);
          let timestamps = coords.map(() => new Date());

          let updated = await locationSchema.updateOne(
            { tripId, step: locationData.step },
            {
              $push: {
                "geometry.coordinates": { $each: coordinates },
                "properties.timestamps": { $each: timestamps },
              },
            },
            { upsert: true }
          );

          console.log("72-------", updated);
        } catch (error) {
          console.log("error in message--------", error);
        } finally {
          const processingEndTime = Date.now();
          const processingTimeTaken =
            (processingEndTime - processingStartTime) / 1000;
          console.log(
            `Time taken to process message: ${processingTimeTaken} seconds`
          );

          logNetworkLatency(startTime);
          logPerformanceMetrics();
        }
      },
    });
  } catch (error) {
    console.log("----------------", error);
  }
};
