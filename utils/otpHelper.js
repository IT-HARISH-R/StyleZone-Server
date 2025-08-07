const otpStore = new Map();

// Simulate sending OTP via WhatsApp (mock for now)
export const sendOTP = async (phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(phone, otp);

  // Simulated sending...
  console.log(`📲 Sending OTP ${otp} to WhatsApp: ${phone}`);

  // If using real WhatsApp API (e.g., Twilio), you would call it here
};

// Verify OTP
export const verifyOTP = async (phone, otp) => {
  const storedOtp = otpStore.get(phone);
  return storedOtp === otp;
};


// | Method | Endpoint                    | Description                |
// | ------ | --------------------------- | -------------------------- |
// | POST   | `/api/auth/signup`          | Register + send OTP        |
// | POST   | `/api/auth/verify-otp`      | OTP verification           |
// | POST   | `/api/auth/login`           | Login user                 |
// | POST   | `/api/auth/forgot-password` | Send OTP to reset password |
// | POST   | `/api/auth/reset-password`  | Reset password using OTP   |
