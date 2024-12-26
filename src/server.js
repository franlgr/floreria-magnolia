import express from "express";
import bodyParser from "body-parser";
import mercadopago from "mercadopago";

const app = express();
app.use(bodyParser.json());

// Configurar Mercado Pago
mercadopago.configure({
  access_token: "APP_USR-67613722-9e36-4871-a97c-0e4d66fdede8",
});

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
        success: "https://plancheto.com/success",
        failure: "https://plancheto.com/failure",
        pending: "https://plancheto.com/pending",
      },
      auto_return: "approved",
      notification_url: "https://plancheto.com/webhook",
    }

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
const PORT = 6767;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
