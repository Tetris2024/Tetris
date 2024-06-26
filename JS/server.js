import express from '../node_modules/express/index.js';
import cors from '../node_modules/cors/lib/index.js';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {createHash} from 'node:crypto';

// Start the server
const app = express();
const PORT = 3000;
app.use(cors());

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

export const getHash = (password) => {
  return new Promise((resolve, reject) => {
    const hash = createHash('md5').update(password).digest('hex');
    resolve(hash);
  });
};