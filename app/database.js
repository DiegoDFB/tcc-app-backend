// database.js
import SQLite from 'react-native-sqlite-storage';

// Abre o banco de dados
const db = SQLite.openDatabase(
  { name: 'mydatabase.db', location: 'default' },
  () => console.log('Database opened successfully'),
  error => console.error('Error opening database: ', error)
);

// Função para criar a tabela
export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT);',
      [],
      () => console.log('Table created successfully'),
      (tx, error) => console.error('Error creating table: ', error)
    );
  });
};

// Função para inserir um usuário
export const insertUser = (email, password) => {
  if (!email || !password) {
    console.error('Email and password are required');
    return;
  }
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO users (email, password) VALUES (?, ?);',
      [email, password],
      () => console.log('User inserted successfully'),
      (tx, error) => console.error('Error inserting user: ', error)
    );
  });
};

// Função para buscar usuários
export const fetchUsers = callback => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM users;', [], (tx, results) => {
      const users = [];
      for (let i = 0; i < results.rows.length; i++) {
        users.push(results.rows.item(i));
      }
      callback(users);
    }, (tx, error) => console.error('Error fetching users: ', error));
  });
};