import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { initDatabase } from '../BDD/init_bd.mjs';

initDatabase();

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the root directory
app.use(express.static(join(__dirname, '../')));

// Handle all other routes by serving the main HTML file
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../pages/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
