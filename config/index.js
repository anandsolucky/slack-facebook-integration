// config/index.js
require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  slackWebhookUrl: process.env.SLACK_WEBHOOK_URL,
  facebookVerifyToken: process.env.FACEBOOK_VERIFY_TOKEN,
  facebookPageAccessToken: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
  appSecret: process.env.APP_SECRET,
  slackWebhookUrl: process.env.SLACK_WEBHOOK_URL,
};
