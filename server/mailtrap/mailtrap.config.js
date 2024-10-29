const { MailtrapClient } = require("mailtrap");

const TOKEN = "9771783b247ab66ba0c6980a96f36217";

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

// Change 'recipients' to an array of objects
const recipients = [
  { email: "adarshashokbaghel@gmail.com" } // Ensure it's an object within an array
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log)
  .catch(console.error);
