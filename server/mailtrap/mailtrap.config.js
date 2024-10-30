const { MailtrapClient } = require("mailtrap");

const TOKEN = "2eafd836150a3ca5ac5b5ee422103ae8";

const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};


  module.exports={
    mailtrapClient,
    sender

  }