const mongoose = require("mongoose");

const PriceTierSchema = new mongoose.Schema(
  {
    free: { type: Number, required: true, min: 0 },
    pro: { type: Number, required: true, min: 0 },
    star: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const PricingSchema = new mongoose.Schema(
  {
    // Reference to owning client
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true, unique: true, index: true },
    monthly: {
      type: PriceTierSchema,
      required: true,
      default: { free: 0, pro: 199, star: 299 },
    },
    yearly: {
      type: PriceTierSchema,
      required: true,
      default: { free: 0, pro: 1999, star: 2999 },
    },
    updatedByClientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pricing", PricingSchema);


