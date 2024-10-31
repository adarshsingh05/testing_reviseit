const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } = require("./emailTemplates");
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
const sendPasswordResetEmail = async(email, resetUrl) =>{
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to : recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
            category: "Password Reset",
        })
        console.log("email set successfull");
        
    } catch (error) {
        console.log("error sendingt the mail", error);
        throw new error("error in sending ", error);
        
    }
}

const sendPasswordResetSuccessfullEmail = async (email) =>{
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to : recipient,
            subject: "Reset Password Successfull",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        })
        console.log("reset password email set successfull");

        
    } catch (error) {
        console.log("error sendingt the mail", error);
        throw new error("error in sending ", error);
        
    }
    
}
// Exporting the function using CommonJS syntax
module.exports = sendVerificationToken, sendPasswordResetEmail, sendPasswordResetSuccessfullEmail;
