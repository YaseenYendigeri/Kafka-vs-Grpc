import { Request, Response, NextFunction } from "express";
import { sendData } from "../services/services.kafkaOperations";
import grpcClient from "../services/grpc.client";

export const seedCoordinates = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    let { name, address, mobile, coordinates, tripId } = request.body;

    // Send data to Kafka
    await sendData("locationUpdate", "seed", { tripId, coordinates });

    // Call gRPC service to update location
    const grpcResponse = await new Promise((resolve, reject) => {
      grpcClient.updateLocations(
        {
          tripId,
          locations: coordinates.map((coord: any) => ({
            lat: coord[0],
            lng: coord[1],
          })),
        },
        (error: any, response: any) => {
          if (error) {
            return reject(error);
          }
          resolve(response);
        }
      );
    });

    // Log the gRPC response if needed
    console.log("gRPC Response:", grpcResponse);

    return response
      .status(200)
      .send({ success: true, data: grpcResponse, message: "" });
  } catch (err) {
    console.log("Error in addUser:", err);
    next(err);
  }
};
