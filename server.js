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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});