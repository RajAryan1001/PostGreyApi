const express = require("express");
const cors = require("cors"); // ✅ add this
const productRoutes = require("./routes/productRoutes");

const app = express();

// ✅ enable CORS (VERY IMPORTANT)
app.use(
  cors({
    origin: "http://localhost:3001", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// health check
app.get("/", (req, res) => res.send("API running 🚀"));

// routes
app.use("/api/products", productRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// global error (fallback)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});