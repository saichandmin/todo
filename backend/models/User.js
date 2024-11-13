const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./todoApp.db"); // SQLite Database

const createTable = () => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE,
        password TEXT,
        name TEXT
    )`);
};

createTable();

const createUser = (id, email, password, name) => {
  const stmt = db.prepare(
    "INSERT INTO users (id, email, password, name) VALUES (?, ?, ?, ?)"
  );
  stmt.run(id, email, password, name, function (err) {
    if (err) {
      console.log("Error inserting user:", err);
    }
  });
  stmt.finalize();
};

const getUserByEmail = (email, callback) => {
  db.get("SELECT * FROM users WHERE email = ?", [email], callback);
};

module.exports = { createUser, getUserByEmail };
