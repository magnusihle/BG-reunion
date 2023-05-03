// pages/api/webhook.ts

import { stripe } from "@/utils/helpers";
import { sendEmail } from "@/utils/sendEmail";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

async function getRawBody(req: NextApiRequest) {
  const chunks: Uint8Array[] = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Read the raw body of the request
    const rawBody = await getRawBody(req);

    // Verify the webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        req.headers["stripe-signature"] as string,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      try {
        await sendEmail({
          email: session.customer_details?.email!,
          name: session.customer_details?.name!,
        });
        res.status(200).json({ received: true });
      } catch (error) {
        console.error("Error sending ticket email:", error);
        res.status(500).json({ error: "Error sending ticket email" });
      }
    } else {
      res.json({ received: true });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

export default handler;
