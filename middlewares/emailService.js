// 📁 middlewares/emailService.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { EMAIL, PASS } from "../utils/config.js";
dotenv.config();

// 1. Setup Nodemailer Transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASS,
  },
});

/**
 * ✉️ Send Email
 * @param {string} to - Receiver email
 * @param {string} subject - Email subject
 * @param {string} html - HTML content
 * @param {string} text - Fallback plain text
 */
export const sendMail = async ({ to, subject, html, text }) => {
  const mailOptions = {
    from: `"StyleZone" <${EMAIL}>`,
    to,
    subject,
    html,
    text,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to", to);
    return result;
  } catch (err) {
    console.error("❌ Email sending error:", err.message);
    throw err;
  }
};
