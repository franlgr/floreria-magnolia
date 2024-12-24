



// import mercadopage from "mercadopago";
// import { MERCADOPAGO_API_KEY } from "../config.js";

// export const createOrder = async (req, res) => {
//   mercadopage.configure({
//     access_token: MERCADOPAGO_API_KEY,
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
//         // pending: "https://e720-190-237-16-208.sa.ngrok.io/pending",
//         // failure: "https://e720-190-237-16-208.sa.ngrok.io/failure",
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
//       const data = await mercadopago.payment.findById(payment["data.id"]);
//       console.log(data);
//     }

//     res.sendStatus(204);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Something goes wrong" });
//   }
// };


import { MercadoPago, Payment } from "mercadopago";
import { MERCADOPAGO_API_KEY } from "../config.js";

const client = new MercadoPago({ accessToken: MERCADOPAGO_API_KEY });

export const createOrder = async (req, res) => {
  const payments = new Payment(client);

  try {
    const result = await payments.create({
      body: {
        additional_info: {
          items: [
            {
              id: "MLB2907679857",
              title: "Laptop",
              description: "High-end laptop",
              picture_url: "https://example.com/laptop.jpg",
              category_id: "electronics",
              quantity: 1,
              unit_price: 500,
            },
          ],
          payer: {
            first_name: "Test",
            last_name: "User",
            phone: {
              area_code: "51",
              number: "987654321",
            },
            address: {
              zip_code: "12312-123",
              state_name: "Lima",
              city_name: "Lima",
              street_name: "Av. Principal",
              street_number: 123,
            },
          },
        },
        description: "Payment for a laptop",
        external_reference: "ORDER123",
        installments: 1,
        payer: {
          entity_type: "individual",
          type: "customer",
          email: "test_user_123@testuser.com",
          identification: {
            type: "DNI",
            number: "12345678",
          },
        },
        payment_method_id: "visa",
        transaction_amount: 500,
      },
      requestOptions: { idempotencyKey: "unique-value-for-request" },
    });

    console.log(result);
    res.json(result.body);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something goes wrong", error });
  }
};

export const receiveWebhook = async (req, res) => {
  try {
    const payment = req.query;
    console.log(payment);

    if (payment.type === "payment") {
      const paymentDetails = await client.payments.findById(payment["data.id"]);
      console.log(paymentDetails);
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something goes wrong", error });
  }
};
