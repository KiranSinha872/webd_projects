const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");

// The real data source — Express fetches this server-side (no browser CORS issues)
const UPSTREAM_URL = "https://hayes-bands-ham-configured.trycloudflare.com/data";

app.use(express.json());

// Serve the dashboard HTML from the public folder
app.use(express.static(path.join(__dirname, "public")));

// CORS headers (for any external clients)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// ── /data  ────────────────────────────────────────────────────────────────────
// Proxies the Cloudflare upstream URL → browser always fetches from same origin
// so there are zero CORS issues in the browser.
app.get("/data", async (req, res) => {
  try {
    const upstream = await fetch(UPSTREAM_URL);
    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: `Upstream returned ${upstream.status}` });
    }
    const data = await upstream.json();
    res.json(data);
  } catch (err) {
    console.error("Proxy fetch error:", err.message);
    res.status(502).json({ error: "Failed to reach upstream: " + err.message });
  }
});

// ── /register  ────────────────────────────────────────────────────────────────
app.post("/register", (req, res) => {
  console.log(req.body);
  fs.appendFileSync(
    path.join(__dirname, "data.json"),
    JSON.stringify(req.body) + "\n",
    "utf-8"
  );
  res.send("user registration confirmed");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
  console.log(`Dashboard: http://localhost:${port}`);
  console.log(`Proxying data from: ${UPSTREAM_URL}`);
});
