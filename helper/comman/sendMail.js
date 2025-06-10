import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "goutamwaghe@gmail.com",
    pass: "lckv lkef udkz biat", //
  },
});

export const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: "goutamwaghe@gmail.com",
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
