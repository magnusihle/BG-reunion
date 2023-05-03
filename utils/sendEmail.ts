import fs from "fs";
import path from "path";
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface EmailInfoProps {
  name: string;
  email: string;
}

export const sendEmail = async (emailInfo: EmailInfoProps) => {
  const templatePath = path.join(process.cwd(), "utils/emailTemplate.html");
  const htmlContent = fs.readFileSync(templatePath, "utf-8");

  const msg = {
    to: emailInfo.email,
    from: "m.ihle.spam@gmail.com", // Replace with your email address
    subject: "JOJO Vesterbro X Distortion",
    html: htmlContent,
  };

  console.log(msg);

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${emailInfo.email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
