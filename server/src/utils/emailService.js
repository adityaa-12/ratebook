import nodemailer from "nodemailer";

export const sendMail = async (to, subject, html) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transport.sendMail({
      from: `"RateBook Support"`,
      to,
      subject,
      html,
    });

    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
