const moment = require("moment-timezone");
const facebookService = require("../services/facebookService");
const slackService = require("../services/slackService");

// Handle incoming webhook events
exports.handleMessageEvent = (req, res) => {
  if (!req.isXHubValid()) {
    console.log(
      "Warning - request header X-Hub-Signature not present or invalid"
    );
    return res.sendStatus(401);
  }

  console.log("Request header X-Hub-Signature validated");

  const receivedUpdates = req.body.entry[0].messaging;
  receivedUpdates.forEach((event) => {
    if (event.message) {
      const senderId = event.sender.id;
      const messageText = event.message.text || "";
      const timestamp = event.timestamp;
      const attachments = event.message.attachments || [];

      try {
        const formattedTime = moment(timestamp)
          .tz("Asia/Kolkata")
          .format("Do MMMM YYYY hh:mm A");

        facebookService
          .fetchUserName(senderId)
          .then(({ name, profile_pic }) => {
            console.log(
              `Received message: "${messageText}" from ${name} (ID: ${senderId}) at ${formattedTime}`
            );
            slackService.sendToSlack(
              messageText,
              name,
              formattedTime,
              profile_pic,
              attachments
            );
          })
          .catch((error) => {
            console.error("Error fetching user name:", error.message);
          });
      } catch (error) {
        console.error("Error formatting timestamp:", error.message);
      }
    }
  });

  res.sendStatus(200);
};
