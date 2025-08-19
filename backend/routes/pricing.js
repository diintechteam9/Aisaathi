const express = require("express");
const router = express.Router();
const { getClientPublicPricing, getOwnPricing, updateOwnPricing } = require("../controllers/pricing");
const { authMiddleware, checkClientAccess } = require("../middlewares/authmiddlewares");

// Public endpoint to get pricing for a specific client via vanity id
router.get("/c/:clientId/pricing", checkClientAccess(), getClientPublicPricing);

// Authenticated client can get/update their own pricing
router.get("/", authMiddleware, getOwnPricing);
router.put("/", authMiddleware, updateOwnPricing);

module.exports = router;


