// database.js
import * as SQLite from 'expo-sqlite';

// Open the database
const db = SQLite.openDatabaseSync('mydatabase.db');

// Function to create the table
export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        sobrenome TEXT,
        email TEXT UNIQUE,
        password TEXT
      );
    `);
  });
};

// Function to insert a user
export const insertUser = (nome, sobrenome, email, password) => {
  if (!email || !password) {
    console.error('Email and password are required');
    return;
  }
  db.transaction(tx => {
    tx.executeSql(`
      INSERT INTO users (nome, sobrenome, email, password) VALUES (?, ?, ?, ?);
    `, [nome, sobrenome, email, password]);
  });
};