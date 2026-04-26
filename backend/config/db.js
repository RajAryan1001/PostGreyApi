const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "myapp",
  password: "RaJ@20032003", 
  port: 5432,
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL connected");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected DB error:", err);
  process.exit(1);
});

module.exports = pool;