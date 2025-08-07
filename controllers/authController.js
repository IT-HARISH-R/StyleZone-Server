import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendMail } from "../middlewares/emailService.js";
import { SECRET_KEY } from "../utils/config.js";
// import { sendOTP as sendWhatsAppOTP, verifyOTP as checkOTP } from "../utils/otpHelper.js";

// Signup
export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password)
    try {
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });

        await sendMail({
            to: email,
            subject: "🎉 Welcome to StyleZone!",
            text: `Hello ${name}, your StyleZone account has been created.`,
            html: `
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; padding: 20px; border-radius: 10px; background-color: #f9fafb;">
                    <div style="text-align: center; padding-bottom: 10px;">
                        <h2 style="color: #7c3aed; margin-bottom: 4px;">StyleZone</h2>
                        <p style="color: #4b5563; font-size: 14px;">Your trusted grooming partner ✂️</p>
                    </div>

                    <hr style="border: none; border-top: 1px solid #d1d5db; margin: 20px 0;" />

                    <div style="font-size: 15px; color: #111827;">
                        <h3 style="margin-bottom: 10px;">Hello ${name},</h3>
                        <p style="margin-bottom: 10px;">🎉 <strong>Welcome to StyleZone!</strong></p>
                        <p style="margin-bottom: 10px;">Your account has been created successfully. You can now book grooming appointments, manage your bookings, and more — all from your phone or desktop.</p>
                        <p style="margin-bottom: 10px;">Make your first booking now and get <strong style="color: green;">10% OFF</strong> on your first visit. 🎁</p>
                    </div>

                    <div style="text-align: center; margin-top: 20px;">
                        <a href="https://stylezone-booking.netlify.app" style="background-color: #7c3aed; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: 500;">
                            Book Your Appointment
                        </a>
                    </div>

                    <hr style="border: none; border-top: 1px solid #d1d5db; margin: 30px 0;" />

                    <div style="font-size: 13px; color: #6b7280; text-align: center;">
                        <p>Thank you,</p>
                        <p>— Team StyleZone</p>
                        <p style="margin-top: 10px;">📍 Mettur, Salem District</p>
                        <p>📞 +91 98765 43210</p>
                        <p>✉️ stylezone@gmail.com</p>
                    </div>
                </div>
`

        });

        res.json({ message: "Registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Signup failed", error: err.message });
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid password" });

        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1d" });
        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
};

export const me = async (request, response) => {
    try {
        const userid = request.userId
        const user = await User.findById(userid);
        // console.log(user)
        if (!user) {
            return response.status(404).json({ message: "user not found" });
        }

        response.json({ user })
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
}

// Forgot Password (send OTP)
export const forgotPassword = async (request, response) => {
    const { email } = request.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return response.json({ message: "this is not registered" })
        }
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '10m' })
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASS
            }
        });

        const mailOptions = {
            from: 'youremail@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/reset-password/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return response.json({ message: 'error sent email' })
            } else {
                return response.json({ status: true, message: 'Link sent to your email, expires in 10 minutes' });
            }
        });
    }
    catch (err) {
        return response.json(err)
    }
};

// Reset Password
export const resetPassword = async (request, response) => {
    const { token } = request.params;
    const { password } = request.body;
    try {
        const decode = await jwt.verify(token, SECRET_KEY);
        const id = decode.id;
        const hashPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate({ _id: id }, { password: hashPassword })
        return response.json({ status: true, message: "your Password is Reset" })
    }
    catch (err) {
        return response.json({ message: "your token expired" })
    }
};


// import bcrypt from "bcryptjs";
// import User from "../models/User.js";
// import { sendOTP, verifyOTP } from "../utils/otpHelper.js";
// import { sendMail } from "../middlewares/emailService.js";

// // Forgot Password (send OTP to WhatsApp + Email)
// export const forgotPassword = async (req, res) => {
//   const { phone } = req.body;

//   try {
//     const user = await User.findOne({ phone });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     await sendOTP(phone, user.email); // ✅ send to both
//     res.json({ message: "OTP sent to your WhatsApp and email." });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to send OTP", error: err.message });
//   }
// };

// // Reset Password (verify OTP + update + send email)
// export const resetPassword = async (req, res) => {
//   const { phone, otp, newPassword } = req.body;

//   try {
//     const verified = await verifyOTP(phone, otp);
//     if (!verified) return res.status(400).json({ message: "Invalid OTP" });

//     const hashed = await bcrypt.hash(newPassword, 10);
//     const user = await User.findOneAndUpdate({ phone }, { password: hashed });

//     // ✅ Send confirmation email
//     await sendMail({
//       to: user.email,
//       subject: "🔐 Password Reset Confirmation",
//       text: `Hi ${user.name}, your StyleZone password has been reset successfully.`,
//       html: `
//         <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:auto;padding:20px;border-radius:10px;background:#f9fafb;border:1px solid #ddd;">
//           <h3 style="color:#7c3aed;">Hi ${user.name},</h3>
//           <p style="color:#111827;">✅ Your password was successfully reset for your <b>StyleZone</b> account.</p>
//           <p>If you didn’t request this change, please contact support immediately.</p>
//           <hr style="margin:20px 0;"/>
//           <p style="color:gray;">Thanks,<br/>Team StyleZone</p>
//         </div>
//       `,
//     });

//     res.json({ message: "Password reset successful and email sent." });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to reset password", error: err.message });
//   }
// };
