import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "vitali_user",
  password: process.env.DB_PASSWORD || "Maryann-0285",
  database: process.env.DB_NAME || "vitali",
  port: process.env.DB_PORT || 3306,
});

try {
  console.log("✅ Connected successfully to MySQL");
  const [rows] = await connection.query("SELECT NOW() AS now, USER() AS user, @@hostname AS server");
  console.log("⏱ Time:", rows[0].now);
  console.log("👤 User in use:", rows[0].user);
  console.log("🖥 Server hostname:", rows[0].server);
} catch (err) {
  console.error("❌ Connection failed:", err.message);
} finally {
  await connection.end();
}
