const axios = require("axios");
require("dotenv").config();
class EmailSender {
  constructor() {
    this.apiUrl = process.env.API_URL;
    this.apiToken = process.env.API_TOKEN; // Replace with your Mailtrap API token
    this.inbox_id = process.env.INBOX_ID;
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

// Unit Test
async function runUnitTest() {
  const emailSender = new EmailSender();

  const params = {
    senderName: "Example Sales Team",
    senderEmail: "johndeo@example.com",
    recipientName: "John Doe",
    recipientEmail: "mohdhassandbg@gmail.com",
    subject: "Your Example Order Confirmation",
    text: "Congratulations on your order no. 1234",
    html: `<html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      </head>
      <body>
        <h1>Order Confirmation</h1>
        <p>Congratulations on your order no. 1234</p>
      </body>
    </html>`,
    attachments: [
      {
        content:
          "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCiAgICA8aGVhZD4KICAgICAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIj4KICAgICAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICAgICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KCiAgICA8L2JvZHk+Cgk8L2h0bWw+Cg==",
        filename: "index.html",
        type: "text/html",
        disposition: "attachment",
      },
    ],
  };

  await emailSender.send(params);
}

runUnitTest();
