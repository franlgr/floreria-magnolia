const express = require('express');
const path = require('path');

const app = express();
const PORT = 6767;

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all other routes with index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Use 0.0.0.0 to allow access from other devices on the network
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Access it on your local network at http://${getLocalIp()}:${PORT}`);
});

// Helper function to get the local IP address
function getLocalIp() {
  const os = require('os');
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}
