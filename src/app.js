require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const xhub = require("express-x-hub");
const config = require("../config");

// Import routes
const webhookRoutes = require("./routes/webhook");

const app = express();
app.use(xhub({ algorithm: "sha1", secret: config.appSecret }));
app.use(bodyParser.json());
app.set("port", config.port);

// Default route
app.get("/", (req, res) => {
  res.send("Slack <> Facebook Integration");
});

// Use the webhook routes
app.use("/messaging-webhook", webhookRoutes);

// Start the server
app.listen(app.get("port"), () => {
  console.log(`Server is running on port ${app.get("port")}`);
});
