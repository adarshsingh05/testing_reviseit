const { VERIFICATION_EMAIL_TEMPLATE } = require("./emailTemplates");
const { mailtrapClient, sender } = require("./mailtrap.config");

const sendVerificationToken = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        });
        console.log("sent", response);
        
    } catch (error) {
        console.log("error sending", error);
        throw new Error("error sending the mail");
    }
};

// Exporting the function using CommonJS syntax
module.exports = sendVerificationToken;
