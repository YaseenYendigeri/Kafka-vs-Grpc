import mongoose from "mongoose";
import { MONGO_URL } from "../env";
// Retry connection
const connectWithRetry = () => {
  console.info("MongoDB connection with retry");
  try {
    if (MONGO_URL) {
      var con = mongoose.connect(MONGO_URL);
      return con;
    }
  } catch (error) {
    console.log("mongo db connection error------", error);
  }
};

// Exit application on error
mongoose.connection.on("error", (err) => {
  console.log("------------", err);
  setTimeout(connectWithRetry, 5000);
});

mongoose.connection.on("connected", () => {
  console.info("MongoDB is connected");
});

// Connect database
export const dbConnection = () => {
  console.info("SETUP - Connecting database..");
  connectWithRetry();
};
