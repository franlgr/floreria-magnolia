import express from "express";
import bodyParser from "body-parser";
import mercadopago from "mercadopago";
import path from "path";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

const publicPath = path.join(process.cwd(), "./src/dist");
app.use(express.static(publicPath));

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

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
app.post("/create-order", async (req, res) => {
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
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ url: response.body.init_point });
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
      const { data } = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: {
          Authorization: `Bearer APP_USR-67613722-9e36-4871-a97c-0e4d66fdede8`,
        },
      });

      console.log("Notificación de pago recibida:", data);

      if (data.status === "approved") {
        console.log("Pago aprobado para el ID:", data.id);
      } else {
        console.log("Estado del pago:", data.status);
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
