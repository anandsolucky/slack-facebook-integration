# 🚀 Slack <> Facebook Integration

## 📝 Overview

This project integrates Facebook with Slack, automatically sending a message to a designated Slack channel when a new message is received in the Facebook inbox.

## 📚 Dev Setup Guide

- Before jumping on the project details checkout this dev setup guide to setup slack and facebook apps -> [Slack-Facebook Integration Setup Guide](https://scientific-flyingfish-577.notion.site/Slack-Facebook-Integration-Setup-Guide-3403f306130b45b29fb3b1e690d926a8)

## 🌟 Features

- Real-time notifications to Slack for every new Facebook messages & attachments received on your page.
- Message formatting with sender name, profile picture, message content, and timestamp and attachment (if any).

## 📂 Project Structure

This project is organized into multiple files to improve maintainability and readability.

Below is the structure of the project and a brief description of each file:

    /slack-facebook-integration

        /src

            |-- /controllers

                |-- messagingController.js

            |-- /routes

                |-- webhook.js

            |-- /services

                |-- facebookService.js

                |-- slackService.js

        /config.js

        |-- /app.js

        |-- /README.md

        |-- /package.json

### 📄 File Descriptions

- **`app.js`**: The main entry point of the application. Sets up the Express server, imports necessary middleware, and defines the routes for the application.

- **`config.js`**: Contains all the configuration settings for the application, such as environment variables like the port number, Facebook verification token, app secret, Slack webhook URL, and Facebook page access token.

- **`routes/webhook.js`**: Defines the route for the Facebook webhook. Includes the GET endpoint for webhook verification and the POST endpoint to handle incoming webhook events.

- **`controllers/messagingController.js`**: Contains the main logic for processing incoming messages from Facebook. Validates incoming requests, formats messages, and coordinates the fetching of user details from Facebook and sending notifications to Slack.

- **`services/facebookService.js`**: Handles all interactions with the Facebook Graph API, such as fetching user details (first name, last name, profile picture) based on the user ID provided in the webhook event.

- **`services/slackService.js`**: Manages the integration with Slack, formatting messages using Slack’s block kit and sending them to a specified Slack channel via a webhook URL.

## 🛠️ How to Run

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the server**:
   ```bash
   npm start
   ```
3. **Configure Environment Variables**:

   - Ensure you have a `.env` file configured with the necessary environment variables:

   ```bash
   PORT=3000
   FACEBOOK_VERIFY_TOKEN=your_facebook_verify_token
   APP_SECRET=your_app_secret
   SLACK_WEBHOOK_URL=your_slack_webhook_url
   FACEBOOK_PAGE_ACCESS_TOKEN=your_facebook_page_access_token`
   ```

### 🙋🏻‍♂️ Video Walkthrough

- Here's the video walkthrough of the entire project - [Video](https://www.loom.com/share/c335113551534ea1b88088008208e21f?sid=39dd7ca5-e9ee-4856-a24e-ee688d5be3cf)

### 🔄 Workflow Overview

- The server starts and listens for incoming requests on the specified port.
- The Facebook webhook endpoint verifies incoming GET requests to confirm the server's identity.
- When a new message is received on the Facebook Page, a POST request is sent to the webhook endpoint.
- The `messagingController.js` processes the incoming message, formats the response, and coordinates with `facebookService.js` to fetch user details.
- The formatted message is then sent to Slack using `slackService.js`.
