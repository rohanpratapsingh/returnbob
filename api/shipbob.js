export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  const token     = process.env.VITE_SHIPBOB_TOKEN;
  const channelId = process.env.VITE_SHIPBOB_CHANNEL_ID;

  if (!token)     return res.status(500).json({ error: "VITE_SHIPBOB_TOKEN is not set in environment variables" });
  if (!channelId) return res.status(500).json({ error: "VITE_SHIPBOB_CHANNEL_ID is not set in environment variables" });

  const { endpoint = "returns" } = req.query;

  // ShipBob 1.0 API
  const ENDPOINTS = {
    returns: "https://api.shipbob.com/1.0/return",
    channel: "https://api.shipbob.com/1.0/channel",
    orders:  "https://api.shipbob.com/1.0/order",
  };

  const baseUrl = ENDPOINTS[endpoint];
  if (!baseUrl) {
    return res.status(400).json({ error: `Unknown endpoint: ${endpoint}. Valid: ${Object.keys(ENDPOINTS).join(", ")}` });
  }

  try {
    const params = new URLSearchParams();
    if (req.query.page)  params.set("Page",  req.query.page);
    if (req.query.limit) params.set("Limit", req.query.limit);
    const fullUrl = params.toString() ? `${baseUrl}?${params}` : baseUrl;

    const sbRes = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Authorization":      `Bearer ${token}`,
        "shipbob-channel-id": String(channelId),
        "Content-Type":       "application/json",
      },
    });

    const text = await sbRes.text();

    if (!sbRes.ok) {
      return res.status(sbRes.status).json({
        error:   "ShipBob API error",
        status:  sbRes.status,
        url:     fullUrl,
        details: text,
        debug: {
          channelIdSent: String(channelId),
          hasToken: !!token,
          tokenLength: token.length,
        },
      });
    }

    let data;
    try { data = JSON.parse(text); }
    catch { return res.status(500).json({ error: "Could not parse ShipBob response", raw: text.slice(0, 500) }); }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: "Proxy fetch error", details: err.message });
  }
}
