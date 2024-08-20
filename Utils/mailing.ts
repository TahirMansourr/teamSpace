import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/lib/models/UserModel";

export const SendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "42a4c824ac90f0",
        pass: "2060f09c159002"
      }
    });
    console.log('I have reached here successfullly 1');
    console.log('this is the eamil' , email);
    
    const mailOptions = {
      from: 'tahir@gmail.com',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="http://localhost:3000/verifyEmail?token=${hashedToken}">here</a> to 
            ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}</p>`,
    };
    console.log('I have reached here successfullly 2');

    const mailresponse = await transport.sendMail(mailOptions);
    console.log('Email sent: ' + mailresponse.response);
    return mailresponse;
  } catch (error: any) {
    throw new Error(`error at mailing.ts: ${error.message}`);
  }
};
