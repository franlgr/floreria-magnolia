import mercadopago from "mercadopago";
import { MERCADOPAGO_API_KEY } from "../config.js";

export const createOrder = async (req, res) => {
  mercadopago.configure({
    access_token: 'APP_USR-67613722-9e36-4871-a97c-0e4d66fdede8',
  });

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
        pending: "http://plancheto.com/pending",
        failure: "http://plancheto.com/failure",
      },
    });

    console.log(result);

    // res.json({ message: "Payment creted" });
    res.json(result.body);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const receiveWebhook = async (req, res) => {
  try {
    const payment = req.query;
    console.log(payment);
    if (payment.type === "payment") {
      const data = await mercadopage.payment.findById(payment["data.id"]);
      console.log(data);
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};









//--------------------------------------------------------------------


// const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });
// const payments = new Payment(client);

// payments.create({
//   body: {
//     additional_info: {
//       items: [
//         {
//           id: 'MLB2907679857',
//           title: 'Point Mini',
//           description: 'Point product for card payments via Bluetooth.',
//           picture_url: 'https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium2x.png',
//           category_id: 'electronics',
//           quantity: 1,
//           unit_price: 58,
//         }
//       ],
//     },
//   requestOptions: { idempotencyKey: '<SOME_UNIQUE_VALUE>' }
//   }
// })
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));
