const express = require("express");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({
  user: "postgres",
  host: "postgres",
  database: "mydb",
  password: "example",
  port: 5432,
});

app.get("/", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users");
    res.json(result.rows);
    client.release();
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Error executing query");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
