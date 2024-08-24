const express = require("express");
const router = express.Router();
const config = require("../../config");
const messagingController = require("../controllers/messagingController");

// Webhook verification endpoint
router.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const requestToken = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && requestToken === config.FACEBOOK_VERIFY_TOKEN) {
    console.log("WEBHOOK_VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(400);
  }
});

// Webhook event handler
router.post("/", messagingController.handleMessageEvent);

module.exports = router;
