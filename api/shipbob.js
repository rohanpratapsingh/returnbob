export default async function handler(req, res) {
  // CORS headers so the browser can call this
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const token     = process.env.VITE_SHIPBOB_TOKEN;
  const channelId = process.env.VITE_SHIPBOB_CHANNEL_ID;

  if (!token || !channelId) {
    return res.status(500).json({ error: "ShipBob credentials not configured in environment variables" });
  }

  const { endpoint = "returns" } = req.query;

  // Map endpoint names to ShipBob API paths
  const ENDPOINTS = {
    returns:  "https://api.shipbob.com/2026-01/return",
    channel:  "https://api.shipbob.com/2026-01/channel",
  };

  const url = ENDPOINTS[endpoint];
  if (!url) {
    return res.status(400).json({ error: `Unknown endpoint: ${endpoint}` });
  }

  try {
    // Build query params — pass through page/limit if provided
    const params = new URLSearchParams();
    if (req.query.page)  params.set("Page",  req.query.page);
    if (req.query.limit) params.set("Limit", req.query.limit);
    const fullUrl = params.toString() ? `${url}?${params}` : url;

    const sbRes = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Authorization":      `Bearer ${token}`,
        "shipbob-channel-id": channelId,
        "Content-Type":       "application/json",
      },
    });

    const text = await sbRes.text();

    // Forward ShipBob's status code
    if (!sbRes.ok) {
      return res.status(sbRes.status).json({
        error:   "ShipBob API error",
        status:  sbRes.status,
        details: text,
      });
    }

    const data = JSON.parse(text);
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: "Proxy error", details: err.message });
  }
}
