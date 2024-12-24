






import express from "express";
import morgan from "morgan";
import path from "path";

import paymentRoutes from "./routes/payment.routes.js";

const app = express();

// Middleware para logs
app.use(morgan("dev"));

// Rutas de API
app.use(paymentRoutes);

// Servir archivos estáticos desde "src/public"
const publicPath = path.resolve("./public");
app.use(express.static(publicPath));

// Ruta para servir el archivo index.html en "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// Servir otros archivos estáticos (como sw.js)
// app.get("/sw.js", (req, res) => {
//   res.sendFile(path.join(publicPath, "sw.js"));
// });

// Iniciar servidor
app.listen(6767, () => {
  console.log("Server on port", 6767);
});
