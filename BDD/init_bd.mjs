import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';

const db = new sqlite3.Database('tetris.db');

export function initDatabase() {
    db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        best_score INTEGER NOT NULL
    )`);
    });
    console.log("table créé avec succès")
}

export function addUser(username, password) {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error(err);
      return;
    }

    db.run(`INSERT INTO users (username, password, best_score) VALUES (?, ?, ?)`, [username, hash, 0], function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Un nouvel utilisateur a été ajouté avec l'ID ${this.lastID}`);
    });
  });
};

export function updateUserScore(username, score) {
  db.get(`SELECT best_score FROM users WHERE username = ?`, [username], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    
    if (row && score > row.best_score) {
      db.run(`UPDATE users SET best_score = ? WHERE username = ?`, [score, username], function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Le score de ${username} a été mis à jour à ${score}`);
      });
    }
  });
};

export function displayUsersWithPassword() {  
    db.all(`SELECT * FROM users`, [], (err, rows) => {
      if (err) {
        throw err;
      }
  
      rows.forEach((row) => {
        console.log(`${row.id} - ${row.username} - ${row.password} - ${row.best_score}`);
      });
    });
  };

// Exemple d'utilisation
initDatabase();
displayUsersWithPassword();