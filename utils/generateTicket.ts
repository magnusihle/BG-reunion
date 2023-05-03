const PDFDocument = require("pdfkit");
const fs = require("fs");

interface TicketInfoProps {
  name: string;
  email: string;
  ticketId: string;
}

export const generateTicket = (ticketInfo: TicketInfoProps) => {
  const doc = new PDFDocument();

  // Write ticket information to the PDF
  doc
    .fontSize(25)
    .text("Event Name", 50, 50)
    .fontSize(18)
    .text(`Ticket for: ${ticketInfo.name}`, 50, 100)
    .text(`Email: ${ticketInfo.email}`, 50, 130)
    .text(`Ticket ID: ${ticketInfo.ticketId}`, 50, 160);

  // Save the PDF to a file
  const stream = doc.pipe(fs.createWriteStream("ticket.pdf"));
  doc.end();

  return new Promise((resolve) => {
    stream.on("finish", () => {
      resolve("ticket.pdf");
    });
  });
};
