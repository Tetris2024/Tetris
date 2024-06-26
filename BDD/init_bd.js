import initSqlJs from '../node_modules/sql.js/dist/sql-wasm.js';
import pkg from '../node_modules/crypto-js/crypto-js.js';
const { SHA256 } = pkg;

let db;

function initDatabase() {
  return new Promise((resolve, reject) => {
    initSqlJs({
      locateFile: name => './node_modules/sql.js/dist/sql-wasm.wasm'
    }).then(SQL => {
      db = new SQL.Database();

      // Create users table if not exists
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          best_score INTEGER NOT NULL
        )
      `;
      db.run(createTableQuery);
      console.log("Database initialized successfully");
      resolve(); // Resolve the promise once initialization is complete
    }).catch(error => {
      console.error("Error initializing database:", error);
      reject(error); // Reject the promise if there's an error
    });
  });
}

function hashPassword(password) {
  return SHA256(password).toString();
}

function addUser(username, password) {
  const hashedPassword = hashPassword(password);

  const insertQuery = `
    INSERT INTO users (username, password, best_score)
    VALUES (?, ?, ?)
  `;
  db.run(insertQuery, [username, hashedPassword, 0]);
  console.log(`User ${username} added successfully`);
}

function userExists(username, callback) {
  const selectQuery = `
    SELECT 1 FROM users WHERE username = ?
  `;
  const stmt = db.prepare(selectQuery);
  const result = stmt.getAsObject([username]);
  stmt.free();
  return callback(null, !!result);
}

function updateUserScore(username, score) {
  const selectQuery = `
    SELECT best_score FROM users WHERE username = ?
  `;
  const stmt = db.prepare(selectQuery);
  const row = stmt.getAsObject([username]);
  stmt.free();

  if (row && score > row.best_score) {
    const updateQuery = `
      UPDATE users SET best_score = ? WHERE username = ?
    `;
    db.run(updateQuery, [score, username]);
    console.log(`User ${username}'s score updated to ${score}`);
  }
}

function displayUsersWithPassword() {
  const selectQuery = `
    SELECT * FROM users
  `;
  const stmt = db.prepare(selectQuery);
  while (stmt.step()) {
    const row = stmt.getAsObject();
    console.log(`${row.id} - ${row.username} - ${row.password} - ${row.best_score}`);
  }
  stmt.free();
}

function authenticateUser(username, password, callback) {
  const hashedPassword = hashPassword(password);

  const selectQuery = `
    SELECT password FROM users WHERE username = ?
  `;
  const stmt = db.prepare(selectQuery);
  const row = stmt.getAsObject([username]);
  stmt.free();

  if (!row) {
    return callback(null, false);
  }

  // Compare hashed passwords
  if (hashedPassword === row.password) {
    console.log("Authentication successful");
    return callback(null, true);
  } else {
    console.log("Authentication failed");
    return callback(null, false);
  }
}

export {
  initDatabase,
  addUser,
  userExists,
  updateUserScore,
  displayUsersWithPassword,
  authenticateUser
};
