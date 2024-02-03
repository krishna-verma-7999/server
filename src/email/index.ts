import * as dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const UserToAdmin = async (
  userEmail: string,
  name: string,
  status: string
) => {
  const html = `
    <div>
      <h1>${name} updated Status of todo to ${status}</h1>
    </div>
    `;
  try {
    const info = await transporter.sendMail({
      from: userEmail,
      to: "karanverma1940@gmail.com",
      subject: "TODO Status Updated",
      html: html,
    });

    console.log("Message sent: ", info.messageId);
  } catch (error) {
    console.log("Error is nodemailer", error);
  }
};
export const DeadlineExceed = async (
  name: string,
  userEmail: string,
  taskName: string
) => {
  const html = `
    <div>
      <h1>Hii, ${name} !! Deadline of your task named- ${taskName} has been exceeded.</h1>
    </div>
    `;
  try {
    const info = await transporter.sendMail({
      from: "karanverma1940@gmail.com",
      to: userEmail,
      subject: "Deadline exceeded",
      html: html,
    });

    console.log("Message sent: ", info.messageId);
  } catch (error) {
    console.log("Error is nodemailer", error);
  }
};
