import mercadopago from "mercadopago";
import { MERCADOPAGO_API_KEY } from "../config.js";

mercadopago.configure({
  access_token: MERCADOPAGO_API_KEY,
});

export const createOrder = async (req, res) => {
  try {
    const result = await mercadopago.preferences.create({
      items: [
        {
          title: "Laptop",
          unit_price: 500,
          currency_id: "PEN",
          quantity: 1,
        },
      ],
      notification_url: "https://plancheto.com/webhook",
      back_urls: {
        success: "http://plancheto.com/success",
        // pending: "https://e720-190-237-16-208.sa.ngrok.io/pending",
        // failure: "https://e720-190-237-16-208.sa.ngrok.io/failure",
      },
    });

    console.log(result);

    res.json(result.body);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const receiveWebhook = async (req, res) => {
  try {
    const payment = req.query;
    console.log(payment);

    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log(data);
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
