# Kafka vs gRPC Performance Comparison for Inter-Service Communication

This project demonstrates the difference in speed between Kafka and gRPC when sending large arrays of geopoints from a client service (Service 1) to a server service (Service 2), with the server storing these points in MongoDB.

## Project Structure

- **Service 1 (Client)**: Generates a large array of arrays of geopoints and sends the data to Service 2.
- **Service 2 (Server)**: Receives the data, processes it, and stores it in MongoDB.

### Key Technologies

- **Kafka**: Used as a messaging system to send the data from Service 1 to Service 2 asynchronously.
- **gRPC**: Used for sending the same data using RPC calls with binary encoding.
- **MongoDB**: Database used to store the geopoints.
- **Node.js**: Backend framework for implementing the services.

## Setup Instructions

### Prerequisites

- Node.js v16+
- MongoDB installed and running
- Kafka cluster running (for Kafka tests)
- gRPC dependencies installed

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start MongoDB locally or provide connection details.

4. Start Kafka (ensure that Kafka cluster is set up).

### Configuration

- **Service 1 (Client)** and **Service 2 (Server)** configurations are located in their respective directories. You may need to adjust the MongoDB URI, Kafka broker addresses, and gRPC host settings in the `.env` files.

### Running the Services

1. Start **Service 2 (Server)**:

   ```bash
   cd service-2
   npm start
   ```

2. Start **Service 1 (Client)**:

   ```bash
   cd service-1
   npm start
   ```

3. Depending on the mode (Kafka or gRPC), Service 1 will send large arrays of geopoints to Service 2, which will store the data in MongoDB.

## Performance Comparison

### Test Setup

For testing, arrays of arrays of geopoints are generated. Each array represents a set of geographical coordinates, and Service 1 sends these arrays to Service 2 using two different mechanisms:

1. **Kafka**: Messages are serialized and sent asynchronously using Kafka.
2. **gRPC**: Data is transmitted via a gRPC stream or unary RPC call.

### Performance Metrics

| Metric          | Kafka                     | gRPC                       |
|-----------------|---------------------------|----------------------------|
| **Latency**     | Higher latency due to the overhead of Kafka message queuing. Ideal for high-throughput but not real-time. | Lower latency due to real-time communication with smaller overhead.|
| **Throughput**  | Higher throughput when sending large batches of data. Suitable for batch processing. | Lower throughput for larger payloads compared to Kafka but excels in low-latency communication. |
| **Reliability** | High reliability due to message persistence and replication in Kafka. | Lower reliability if network failure occurs, but can be mitigated with retries. |
| **Data Size**   | Kafka efficiently handles larger data sizes but introduces latency. | gRPC performance decreases with very large payloads. |
| **Storage**     | Both Kafka and gRPC stored the data successfully in MongoDB, but Kafka is more suited for distributed, fault-tolerant scenarios. | gRPC's direct communication model is more suited for real-time systems requiring immediate feedback. |

### Results

- **Kafka**: Due to its asynchronous nature, Kafka introduced a slight delay, but it was able to handle larger batches of geopoints efficiently without any issues in message delivery or storage. Ideal for handling very large data sets in a fault-tolerant manner.
- **gRPC**: gRPC had a faster response time, but for extremely large data, it struggled with throughput compared to Kafka. It's better suited for low-latency, real-time communication when the payload size is moderate.

### Conclusion

- **Kafka** is better suited for applications that need high throughput and fault tolerance, especially for large datasets. However, it has slightly higher latency due to message queuing.
- **gRPC** provides lower latency and is great for real-time communication, but it may not handle extremely large payloads as efficiently as Kafka.

## How to Test

1. **Run both services using Kafka**:

   - In **Service 1 (Client)**, ensure that the communication mode is set to Kafka by updating the `.env` file with:
     ```
     MODE=kafka
     ```
   - Start **Service 2 (Server)** using:
     ```bash
     cd service-2
     npm start
     ```

   - Start **Service 1 (Client)** using:
     ```bash
     cd service-1
     npm start
     ```

2. **Run both services using gRPC**:

   - In **Service 1 (Client)**, switch the communication mode to gRPC by setting:
     ```
     MODE=grpc
     ```
   - Start **Service 2 (Server)** with gRPC mode using:
     ```bash
     cd service-2
     npm run grpc
     ```

   - Start **Service 1 (Client)** using:
     ```bash
     cd service-1
     npm start
     ```

### Monitoring Performance

Use the logs generated by both services to observe the time taken for data transmission and storage in MongoDB. You can also measure memory usage and CPU performance.
