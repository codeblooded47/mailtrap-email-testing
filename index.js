const axios = require("axios");
require("dotenv").config();
class EmailSender {
  constructor({ apiUrl, apiToken, inbox_id }) {
    this.apiUrl = apiUrl;
    this.apiToken = apiToken; // Replace with your Mailtrap API token
    this.inbox_id = inbox_id;
  }

  async send(params) {
    try {
      const {
        senderName,
        senderEmail,
        recipientName,
        recipientEmail,
        subject,
        text,
        html,
        attachments,
      } = params;

      // Validate required parameters
      if (
        !senderName ||
        !senderEmail ||
        !recipientName ||
        !recipientEmail ||
        !subject
      ) {
        throw new Error("Required parameters missing.");
      }

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Api-Token": this.apiToken,
      };

      const data = {
        from: { email: senderEmail, name: senderName },
        to: [{ email: recipientEmail, name: recipientName }],
        subject,
        text,
        html,
        attachments,
      };

      const options = {
        method: "POST",
        url: `${this.apiUrl}/send/${this.inbox_id}`, // Replace 'inbox_id' with the appropriate inbox ID
        headers,
        data,
      };

      const response = await axios.request(options);

      console.log("Email sent successfully!");
      console.log("Message ID:", response.data);
    } catch (error) {
      console.error("Error sending email:", error.response);
    }
  }
}
module.exports = EmailSender;
