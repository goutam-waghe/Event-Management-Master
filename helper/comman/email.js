import emailjs from "@emailjs/nodejs";

const sendMailwithemailjs = async ({ name, title, message, time }) => {
  try {
    const result = await emailjs.send(
      "service_m7639fr",
      "template_r723nom",
      {
        name,
        message,
        time,
        title,
      },
      {
        publicKey: "mSKlU2EysRt8GwIYC",
        privateKey: "P6lVMwUWKqbANUQIKNESf",
      }
    );
    console.log(result);

    return result;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendMailwithemailjs;
