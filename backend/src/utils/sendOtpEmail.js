import nodemailer from "nodemailer";

const createTransporter = () =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000,
    family: 4,
  });

export const verifyEmailService = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log("Email service is ready");
  } catch (err) {
    console.error("Email service error:", err);
  }
};

export const sendOtpEmail = async (name, email, otp) => {
  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"From Task Manager" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your One-Time Password (OTP)",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Hi ${name},</h2>
          <p>Your OTP is:</p>
          <h1 style="letter-spacing: 4px;">${otp}</h1>
          <p>This OTP will expire soon.</p>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error("Email send failed:", error);
    throw new Error("Failed to send email");
  }
};
