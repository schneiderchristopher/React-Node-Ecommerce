import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database | null = null;

export async function getDb() {
  if (db) return db;

  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  // Criando tabelas caso não existam, considerando que é apenas um projeto de teste, em produção um seed seria mais recomendado.
  await db.exec(`
    CREATE TABLE IF NOT EXISTS Products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      imageUrl TEXT
    );

    CREATE TABLE IF NOT EXISTS Orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id TEXT NOT NULL,
      delivery_date TEXT NOT NULL,
      status TEXT CHECK( status IN ('pending', 'confirmed') ) NOT NULL DEFAULT 'pending'
    );

    CREATE TABLE IF NOT EXISTS OrderItems (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (order_id) REFERENCES Orders(id),
      FOREIGN KEY (product_id) REFERENCES Products(id)
    );
  `);

  return db;
}