// import { MercadoPago, Payment } from "mercadopago";
// import { MERCADOPAGO_API_KEY } from "../config.js";

const { MercadoPago, Payment } = require("mercadopago");
const { MERCADOPAGO_API_KEY } = require("../config.js");


const client = new MercadoPago({ accessToken: MERCADOPAGO_API_KEY });
const payments = new Payment(client);

export const createOrder = async (req, res) => {
  try {
    const result = await payments.create({
      body: {
        additional_info: {
          items: [
            {
              id: "item1",
              title: "Laptop",
              description: "A high-performance laptop",
              picture_url: "https://example.com/laptop.png", // Cambia esto a una URL válida si tienes imágenes
              category_id: "electronics",
              quantity: 1,
              unit_price: 500,
            },
          ],
        },
        notification_url: "https://plancheto.com/webhook",
        back_urls: {
          success: "http://plancheto.com/success",
          // pending: "http://plancheto.com/pending",
          // failure: "http://plancheto.com/failure",
        },
      },
      requestOptions: {
        idempotencyKey: "unique-key-for-request",
      },
    });

    console.log(result);
    res.json(result.response); // Devuelve el cuerpo de la respuesta
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
      const data = await client.get(`/v1/payments/${payment["data.id"]}`);
      console.log(data);
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
