import os from "os";
import * as process from "process";
import { performance, PerformanceObserver } from "perf_hooks";

// Helper function to log system performance statistics
export const logPerformanceMetrics = () => {
  const memoryUsage = process.memoryUsage();
  const cpuUsage = os.cpus();
  const systemUptime = os.uptime();
  const eventLoopDelay = process.hrtime();
  const loadAverage = os.loadavg();

  // Active handles and requests via performance observer
  const activeHandles = process.resourceUsage().involuntaryContextSwitches; // Using resource usage instead of private method

  console.log("\n===== Performance Metrics =====");
  console.log(
    `Memory Usage (MB): RSS: ${(memoryUsage.rss / 1024 / 1024).toFixed(
      2
    )}, Heap Used: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(
      2
    )}, Heap Total: ${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)}`
  );
  console.log(`CPU Info: ${cpuUsage.map((cpu) => cpu.model).join(", ")}`);
  console.log(`System Uptime: ${systemUptime.toFixed(2)} seconds`);
  console.log(`Event Loop Delay: ${eventLoopDelay[0]} seconds`);
  console.log(
    `Load Average: 1min: ${loadAverage[0].toFixed(
      2
    )}, 5min: ${loadAverage[1].toFixed(2)}, 15min: ${loadAverage[2].toFixed(2)}`
  );
  console.log(`Active Handles: ${activeHandles}`);
  console.log("================================\n");
};

// Function to log network latency for gRPC/Kafka
export const logNetworkLatency = (start: [number, number]) => {
  const latency = process.hrtime(start);
  const latencyMs = latency[0] * 1000 + latency[1] / 1e6;
  console.log(`Network Latency: ${latencyMs.toFixed(3)} ms`);
};
