import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const packageDefinition = protoLoader.loadSync(
  "src/api/v1/services/test.proto",
  {}
);
const locationProto: any =
  grpc.loadPackageDefinition(packageDefinition).location;

const client = new locationProto.LocationService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

export default client;
