const otpMem = new Map();

export const storeOTP = (email, otp) => {
  const ttl = 5 * 60 * 1000;
  const expiresAt = Date.now() + ttl;
  otpMem.set(email, { otp : otp, expiresAt });

  setTimeout(() => {
    otpMem.delete(email);
  }, ttl);
  console.log(otpMem);
};

export const verifyOTP = (email, otp) => {
  const record = otpMem.get(email);
  if (!record) {
    return false;
  }
  if (record.expiresAt < Date.now()) {
    otpMem.delete(email);
    return false;
  }
  const isValid = record.otp == otp;
  if (isValid) otpMem.delete(email);
  return isValid;
};
