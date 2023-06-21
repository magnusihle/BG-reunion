import fs from "fs";
import path from "path";
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface EmailInfoProps {
  name: string;
  email: string;
}

export const sendEmail = async (emailInfo: EmailInfoProps) => {
  const mailContent = `
  <html>
  <head>
      <link href="https://fonts.googleapis.com/css2?family=Lexend+Exa&display=swap" rel="stylesheet">
      <style>
          body {
              font-family: 'Lexend Exa', sans-serif;
          }
      </style>
  </head>
  <body>
      <p>Hei ${emailInfo.name},</p>
      <p>Det er med stor glede vi ønsker deg velkommen til Reunion!</p>
      <p>Arrangementet finner sted den 18. august på Jardarhuset.</p>
      <p>Ytterligere informasjon om arrangementet vil bli sendt til deg om kort tid. I mellomtiden, hvis du har spørsmål eller allergier vi bør være oppmerksomme på, vennligst ta kontakt.</p>
      <br />
      <p>Vennlig hilsen,</p>
      <p>Ida, Julie, Ingvild, Hannah og Magnus</p>
  </body>
  </html>
`;

  const msg = {
    to: emailInfo.email,
    from: "BG Reunion <m.ihle.spam@gmail.com>", // Replace with your email address
    subject: "Invitasjon",
    html: mailContent,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${emailInfo.email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
