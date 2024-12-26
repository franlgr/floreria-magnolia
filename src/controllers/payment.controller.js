// import mercadopage from "mercadopago";
// import { MERCADOPAGO_API_KEY } from "../config.js";

// export const createOrder = async (req, res) => {
//   mercadopage.configure({
//     access_token: 'APP_USR-67613722-9e36-4871-a97c-0e4d66fdede8',
//   });

//   try {
//     const result = await mercadopage.preferences.create({
//       items: [
//         {
//           title: "Laptop",
//           unit_price: 500,
//           currency_id: "PEN",
//           quantity: 1,
//         },
//       ],
//       notification_url: "https://plancheto.com/webhook",
//       back_urls: {
//         success: "http://plancheto.com/success",
//         pending: "http://plancheto.com/pending",
//         failure: "http://plancheto.com/failure",
//       },
//     });

//     console.log(result);

//     // res.json({ message: "Payment creted" });
//     res.json(result.body);
//   } catch (error) {
//     return res.status(500).json({ message: "Something goes wrong" });
//   }
// };

// export const receiveWebhook = async (req, res) => {
//   try {
//     const payment = req.query;
//     console.log(payment);
//     if (payment.type === "payment") {
//       const data = await mercadopage.payment.findById(payment["data.id"]);
//       console.log(data);
//     }

//     res.sendStatus(204);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Something goes wrong" });
//   }
// };









// //--------------------------------------------------------------------


// // const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });
// // const payments = new Payment(client);

// // payments.create({
// //   body: {
// //     additional_info: {
// //       items: [
// //         {
// //           id: 'MLB2907679857',
// //           title: 'Point Mini',
// //           description: 'Point product for card payments via Bluetooth.',
// //           picture_url: 'https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium2x.png',
// //           category_id: 'electronics',
// //           quantity: 1,
// //           unit_price: 58,
// //         }
// //       ],
// //     },
// //   requestOptions: { idempotencyKey: '<SOME_UNIQUE_VALUE>' }
// //   }
// // })
// //   .then((result) => console.log(result))
// //   .catch((error) => console.log(error));





const express = require("express");
const bodyParser = require("body-parser");
const mercadopago = require("mercadopago");

// Configurar Mercado Pago
mercadopago.configure({
  access_token: "APP_USR-67613722-9e36-4871-a97c-0e4d66fdede8",
});

const app = express();
app.use(bodyParser.json());

// Producto estático
const product = {
  id: "12345",
  title: "Producto Estático",
  description: "Descripción del producto estático",
  price: 100.0,
  currency: "USD",
  quantity: 1,
};

// Endpoint para crear preferencia de pago
app.post("/create_preference", async (req, res) => {
  try {
    const preference = {
      items: [
        {
          title: product.title,
          description: product.description,
          unit_price: product.price,
          quantity: product.quantity,
          currency_id: product.currency,
        },
      ],
      back_urls: {
        success: "https://www.tu-sitio.com/success",
        failure: "https://www.tu-sitio.com/failure",
        pending: "https://www.tu-sitio.com/pending",
      },
      auto_return: "approved",
      notification_url: "https://www.tu-sitio.com/webhook",
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Webhook para manejar notificaciones de pagos
app.post("/webhook", async (req, res) => {
  try {
    const { type, id } = req.query;

    if (type === "payment") {
      const payment = await mercadopago.payment.findById(id);
      console.log("Notificación de pago recibida:", payment.body);

      if (payment.body.status === "approved") {
        console.log("Pago aprobado para el ID:", payment.body.id);
      } else {
        console.log("Estado del pago:", payment.body.status);
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error en el webhook:", error);
    res.sendStatus(500);
  }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

