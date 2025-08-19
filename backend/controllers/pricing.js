const Pricing = require("../models/Pricing");
const Client = require("../models/Client");

// Public: GET pricing for a specific client by userId (vanity id)
const getClientPublicPricing = async (req, res) => {
  try {
    const clientUserId = req.params.clientId;
    const client = await Client.findOne({ userId: clientUserId }).select("_id");
    if (!client) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }

    let pricing = await Pricing.findOne({ client: client._id }).lean();
    if (!pricing) {
      // Defaults if not set for client
      pricing = {
        monthly: { free: 0, pro: 199, star: 299 },
        yearly: { free: 0, pro: 1999, star: 2999 },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    return res.status(200).json({ success: true, pricing });
  } catch (error) {
    console.error("Error fetching client pricing:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch pricing" });
  }
};

// Authenticated client: GET their own pricing
const getOwnPricing = async (req, res) => {
  try {
    const clientId = req.user.id;
    let pricing = await Pricing.findOne({ client: clientId }).lean();
    if (!pricing) {
      pricing = await Pricing.create({ client: clientId });
      pricing = pricing.toObject();
    }
    return res.status(200).json({ success: true, pricing });
  } catch (error) {
    console.error("Error fetching own pricing:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch pricing" });
  }
};

// Authenticated client: UPDATE their own pricing
const updateOwnPricing = async (req, res) => {
  try {
    const { monthly, yearly } = req.body || {};
    if (!monthly && !yearly) {
      return res.status(400).json({ success: false, message: "No pricing data provided" });
    }
    const clientId = req.user.id;

    const update = { updatedByClientId: clientId };
    if (monthly) update.monthly = monthly;
    if (yearly) update.yearly = yearly;

    const pricing = await Pricing.findOneAndUpdate(
      { client: clientId },
      { $set: update, $setOnInsert: { client: clientId } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();

    return res.status(200).json({ success: true, pricing });
  } catch (error) {
    console.error("Error updating pricing:", error);
    return res.status(500).json({ success: false, message: "Failed to update pricing" });
  }
};

module.exports = { getClientPublicPricing, getOwnPricing, updateOwnPricing };


