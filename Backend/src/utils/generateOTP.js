// OTP generation — produces a random 6-digit numeric one-time password.
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export default generateOTP;