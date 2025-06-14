const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

const port = 3000;

const dbConfig = {
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || '0000',
  database: process.env.DB_NAME || 'node_db',
};

app.get('/', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT NOW() as now');
    res.json({ message: 'Hello from Node.js with MySQL!', time: rows[0].now });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database connection failed' });
  } finally {
    if (connection) await connection.end();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
