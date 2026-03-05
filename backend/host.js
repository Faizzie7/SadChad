import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Proxy API requests to backend
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
    pathRewrite: { "^/api": "" }
  })
);

// Serve Angular build
const distPath = path.join(__dirname, "..", "frontend", "dist", "frontend", "browser");
app.use(express.static(distPath));

// SPA fallback (Express 5 safe)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(8081, "0.0.0.0", () => {
  console.log("✅ Combined server running on http://localhost:8081");
});