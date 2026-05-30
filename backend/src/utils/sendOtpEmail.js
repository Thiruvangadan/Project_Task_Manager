import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
export const sendOtpEmail = async (name, email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your One-Time-Password (OTP)",
      html: `
        <div>
          <h2>Dear ${name},</h2>

          <p>Your OTP is:</p>

          <h1>${otp}</h1>

          <p>
            This OTP will expire soon.
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.log(error);

    throw new Error("Failed to send email");
  }
};
