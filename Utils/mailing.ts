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

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "42a4c824ac90f0",
        pass: "2060f09c159002",
      },
    });

    const mailOptions = {
      from: 'tahirelmag@mailtrap.io',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="https://localhost:3000/verifyemail?token=${hashedToken}">here</a> to 
            ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    console.log('Email sent: ' + mailresponse.response);
    return mailresponse;
  } catch (error: any) {
    throw new Error(`error at mailing.ts: ${error.message}`);
  }
};
