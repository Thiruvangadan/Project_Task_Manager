import "../config/env.config.js";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.EMAIL_API);

export const sendOtpEmail = async (name, email, otp) => {
  try {
    // const transporter = createTransporter();

    // await transporter.sendMail({
    //   from: `"From Task Manager" <${process.env.EMAIL_USER}>`,
    //   to: email,
    //   subject: "Your One-Time Password (OTP)",
    //   html: `
    //     <div style="font-family: Arial, sans-serif;">
    //       <h2>Hi ${name},</h2>
    //       <p>Your OTP is:</p>
    //       <h1 style="letter-spacing: 4px;">${otp}</h1>
    //       <p>This OTP will expire soon.</p>
    //     </div>
    //   `,
    // });
    const msg = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: "Your One-Time Password (OTP)",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Hi ${name},</h2>
          <p>Your OTP is:</p>
          <h1 style="letter-spacing: 4px;">${otp}</h1>
          <p>This OTP will expire soon.</p>
        </div>
      `,
    };

    sgMail
      .send(msg)
      .then(() => console.log("Email sent"))
      .catch((error) => console.error(error.response?.body || error));

    return true;
  } catch (error) {
    console.error("Email send failed:", error);
    throw new Error("Failed to send email");
  }
};
