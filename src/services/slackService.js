const axios = require("axios");
const config = require("../../config");

// Function to send formatted data to Slack
exports.sendToSlack = (
  message,
  userName,
  formattedTime,
  profilePic,
  attachments
) => {
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:wave: *New message received on Facebook!*`,
      },
    },
    {
      type: "section",
      block_id: "user_info",
      fields: [
        {
          type: "mrkdwn",
          text: `*From:*\n ${userName}`,
        },
        {
          type: "mrkdwn",
          text: `*Timestamp:*\n ${formattedTime}`,
        },
      ],
      accessory: {
        type: "image",
        image_url: profilePic,
        alt_text: "User profile picture",
      },
    },
  ];

  if (message) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:speech_balloon: *Message:*\n "${message}"`,
      },
    });
  }

  attachments.forEach((attachment) => {
    if (attachment.type === "image") {
      blocks.push({
        type: "image",
        image_url: attachment.payload.url,
        alt_text: "Image sent on Facebook Messenger",
      });
    }
  });

  const payload = { blocks };

  axios
    .post(config.slackWebhookUrl, payload)
    .then((response) => {
      console.log("Message successfully sent to Slack:", response.data);
    })
    .catch((error) => {
      console.error("Error sending message to Slack:", error.message);
    });
};
