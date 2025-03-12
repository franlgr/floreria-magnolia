const express = require('express');
const path = require('path')

const app = express();



// Configurar la carpeta de archivos estáticos para servir los archivos de la aplicación Vue
app.use(express.static(path.join(__dirname, 'dist')));
// // app.use(express.static(path.join(__dirname, '../dist/Content')));

// Configurar la ruta de la aplicación
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
//   });

// Puerto en el que el servidorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
const port = process.env.PORT || 6060;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});
