## mailtrap-email-testing Package Usage Guide

The `mailtrap-email-testing` package allows you to send emails using the Mailtrap Email Testing API. Follow the steps below to use the package effectively.

### Prerequisites

Before getting started, make sure you have the following prerequisites:

- Node.js installed on your machine
- Mailtrap API credentials (API URL, API Token, Inbox ID)
- A basic understanding of JavaScript and Node.js

### Installation

To use the `mailtrap-email-testing` package, you need to install it as a dependency in your project. Open your terminal and navigate to your project directory. Then, run the following command:

```bash
npm install mailtrap-email-testing
```

### Getting Started

To start using the `mailtrap-email-testing` package, follow these steps:

1. Import the package and create an instance of the `EmailSender` class:

```javascript
const { EmailSender } = require("mailtrap-email-testing");
const emailSender = new EmailSender({
  apiUrl: process.env.API_URL,
  apiToken: process.env.API_TOKEN,
  inbox_id: process.env.INBOX_ID,
});
```

2. Define the required parameters for sending an email:

```javascript
const params = {
  senderName: "Example Sales Team",
  senderEmail: "johndeo@example.com",
  recipientName: "John Doe",
  recipientEmail: "johndoe@example.com",
  subject: "Your Example Order Confirmation",
  text: "Congratulations on your order no. 1234",
  html: "<html><body><h1>Order Confirmation</h1><p>Congratulations on your order no. 1234</p></body></html>",
  attachments: [
    {
      content: "Base64-encoded content",
      filename: "attachment.txt",
      type: "text/plain",
      disposition: "attachment",
    },
  ],
};
```

Make sure to replace the placeholder values with your actual email data.

3. Call the `send` method to send the email:

```javascript
emailSender.send(params);
```

### Customization

You can customize the behavior of the `EmailSender` class by providing the Mailtrap API credentials when creating an instance of the `EmailSender` class:

```javascript
const emailSender = new EmailSender({
  apiUrl: "https://api.mailtrap.io",
  apiToken: "YOUR_API_TOKEN",
  inboxId: "YOUR_INBOX_ID",
});
```

Replace `'YOUR_API_TOKEN'` with your Mailtrap API token and `'YOUR_INBOX_ID'` with the appropriate inbox ID.

### Error Handling

If an error occurs during the email sending process, the `send` method will throw an error. You can handle errors using a try-catch block:

```javascript
try {
  // Code for sending email
} catch (error) {
  console.error("Error sending email:", error);
}
```

---

That's it! You can now use the `mailtrap-email-testing` package to send emails using the Mailtrap Email Testing API. Remember to replace the placeholder values and ensure that you have the necessary API credentials before using the package.

If you encounter any issues or have any questions, refer to the package documentation or seek assistance from the Mailtrap support team.

Happy emailing!
