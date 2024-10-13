import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import locationSchema from "./models/models.location";
import { dbConnection } from "./utils/utils.mongoDb";
import os from "os";
import process from "process";
import {
  logNetworkLatency,
  logPerformanceMetrics,
} from "./helpers/performanceMetrics";

// Load the protobuf
const packageDefinition = protoLoader.loadSync(
  "src/api/v1/services/test.proto",
  {}
);
const locationProto: any =
  grpc.loadPackageDefinition(packageDefinition).location;

// Implement the UpdateLocations RPC method
const updateLocations = async (call: any, callback: any) => {
  const startTime = process.hrtime(); // Start time for latency measurement
  const processingStartTime = Date.now(); // For processing time

  try {
    const { tripId, locations } = call.request;

    console.log("Received Location Data", { tripId, locations });

    let allLocationData = await locationSchema
      .find({ tripId })
      .sort({ step: -1 });
    let locationData = allLocationData[0];

    let coordinates = locations.map((loc: any) => [loc.lat, loc.lng]);
    let timestamps = locations.map(() => new Date());

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

    console.log("Updated Database:", updated);

    // Prepare the response
    const response = { status: "success" };
    callback(null, response);
  } catch (error) {
    console.error("Error processing message:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error processing location data",
    });
  } finally {
    const processingEndTime = Date.now();
    const processingTimeTaken =
      (processingEndTime - processingStartTime) / 1000;
    console.log(
      `Time taken to process message: ${processingTimeTaken} seconds`
    );

    // Log network latency and performance metrics
    logNetworkLatency(startTime); // Pass start time for network latency
    logPerformanceMetrics(); // Log performance metrics
  }
};

const startServer = async () => {
  try {
    await dbConnection();

    const server = new grpc.Server();
    server.addService(locationProto.LocationService.service, {
      updateLocations,
    });
    const port = "50051";
    server.bindAsync(
      `0.0.0.0:${port}`,
      grpc.ServerCredentials.createInsecure(),
      () => {
        console.log(`gRPC server running at http://localhost:${port}`);
        server.start();
      }
    );
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
