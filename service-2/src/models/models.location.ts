import mongoose from "mongoose";
const locationSchema = new mongoose.Schema(
  {
    tripId: {
      type: String,
      required: true,
    },
    isPickedUp: { type: Boolean, required: true, default: false },
    geometry: {
      type: {
        type: String,
        enum: ["MultiPoint"],
        default: "MultiPoint",
        required: true,
      },
      coordinates: {
        type: [[Number]],
        required: true,
      },
    },
    properties: {
      timestamps: {
        type: [Date],
        required: true,
      },
    },
    pickupGeometry: {
      type: {
        type: String,
        enum: ["MultiPoint"],
        default: "MultiPoint",
        required: true,
      },
      coordinates: {
        type: [[Number]],
        required: true,
      },
    },
    pickupProperties: {
      timestamps: {
        type: [Date],
        required: true,
      },
    },
    step: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Location", locationSchema);
