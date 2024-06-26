import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { initDatabase } from '../BDD/init_bd.js';

// Initialize the database before starting the server
initDatabase().then(() => {
  // Database initialization is complete, start the server
  const app = express();
  const PORT = 3000;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  // Middleware to set correct MIME type for .js files
  app.use(express.static(join(__dirname, '../'), {
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    },
  }));

  // Handle all other routes by serving the main HTML file
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../pages/index.html'));
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

}).catch(error => {
  console.error("Error initializing database:", error);
});
